'use client'

import { Button } from "@/components/ui/button"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Category, Image as Image } from "@/lib/images"
import { List, PhoneCall, PhoneIncoming } from "lucide-react"
import UserAvatar from "@/components/views/avatar/user-avatar"
import { UserVoiceCallList } from "@/components/views/avatar/user-voice-call"
import CategorySettings from "@/components/settings"
import { BarLoader } from "react-spinners"
import { Profile } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import CreateModal from "./create-modal"
import { useRouter, useSearchParams } from "next/navigation"

const views = [
  { name: 'VC', icon: <PhoneCall /> },
  { name: 'VC 2', icon: <PhoneIncoming />  },
  { name: 'List', icon: <List /> }
]

interface Props {
  user: Profile | null;
  setUser: Dispatch<SetStateAction<Profile | null>>
}

export default function AvatarPage({user, setUser}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const [currentImage, setCurrentImage] = useState<Image | null>(null)
  const [totalImages, setTotalImages] = useState<{ postCount: number, filteredPostCount: number }>({ postCount: 0, filteredPostCount: 0 })
  const [selected, setSelected] = useState<Category[]>([]);
  const [view, setView] = useState<0 | 1 | 2>(0)
  const [users, setUsers] = useState<string[]>(["", ""])
  const [loading, setLoading] = useState<boolean>(false)

  const type = searchParams.get('type') || undefined;
  const id = searchParams.get('id') || undefined;

  function setMetadata(post: Image) {
    document.title = `${post.name} - Bubu & Dudu Time`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Bubu & Dudu Time - ${post.name}`)
    document.querySelector('meta[name="og:title"]')?.setAttribute('content', `${post.name} - Bubu & Dudu Time`)
    document.querySelector('meta[name="og:description"]')?.setAttribute('content', `Bubu & Dudu Time - ${post.name}`)
    document.querySelector('meta[name="og:image"]')?.setAttribute('content', post.images[0].url)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', `${post.name} - Bubu & Dudu Time`)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', `Bubu & Dudu Time - ${post.name}`)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', post.images[0].url)
  }

  useEffect(() => {
    async function getImageTotals() {
      const totalImages = await fetch(`/api/post/count`).then((res) => res.json());
      setTotalImages({ postCount: totalImages.postCount, filteredPostCount: totalImages.postCount });
    }

    async function getPost() {
      const post: Image = await fetch(`/api/post?id=${id}`).then((res) => res.json());
      setCurrentImage(post);
      setMetadata(post);
    }
    
    getImageTotals();
    if (id) getPost();
    if (!type) router.replace(`?type=1`)
  }, [])

  async function handleSelect() {
    setLoading(true);
    const randomImage: Image = await fetch(`/api/post/random?filters=${selected.map(s => s.id).join(',')}`).then((res) => res.json());
    setCurrentImage(randomImage);
    setMetadata(randomImage);
    router.replace(`?type=1&id=${randomImage.id}`)
    setLoading(false);
  }

  useEffect(() => {
    if (!selected.length || selected.length === 0) {
      setTotalImages((prev) => {
        return { postCount: prev.postCount, filteredPostCount: prev.postCount }
      })
      return;
    };
    fetch(`/api/post/count${selected.length >= 1 && `?filters=${selected.map(s => s.id).join(',')}`}`).then((res) => res.json()).then((data) => setTotalImages(data))
  }, [selected])

  function handleView() {
    toast({
      title: 'Coming Soon',
      description: 'This feature is coming soon!',
    })
    // setView((prevView) => (prevView === 2 ? 0 : (prevView + 1) as 0 | 1 | 2))
  }

  useEffect(() => {
    if (!currentImage || !currentImage.images.length) return;
    if (currentImage.images.length === users.length) {
      return;
    } else if (currentImage.images.length > users.length) {
      const newUserNames = Array.from({ length: currentImage.images.length - users.length }, (_, index) => '');
      setUsers([...users, ...newUserNames]);
    } else if (currentImage.images.length < users.length) {
      setUsers(users.slice(0, currentImage.images.length));
    }
  }, [currentImage, users]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-y-7">
      {view === 0 && 
        <div className="flex gap-x-5">
          {currentImage && Array.from(Array(currentImage.images.length).keys()).map((u, i) => <UserAvatar key={i} user={user} i={i} selected={currentImage} setUser={setUser} />)}
        </div>
      }
      {view === 1 && 
        <UserVoiceCallList users={users} setUsers={setUsers} selected={currentImage} />
      }
      <div className="flex gap-x-2">
        <Button variant='secondary' className="rounded-[4px] h-8 w-8" size='icon' onClick={handleView}>
          {views[view].icon}
        </Button>
        <Button className="rounded-[4px] h-8 font-arial uppercase font-bold" onClick={handleSelect} disabled={loading}>
          {loading ? <BarLoader color="white" /> : 'Generate'}
        </Button>
        <CategorySettings
          selected={selected}
          setSelected={setSelected}
          totalImages={totalImages}
        />
        <CreateModal user={user} />
      </div>
      {currentImage &&
        <div className="flex flex-col">
          <h2>{currentImage.name}</h2>
          <p>@{currentImage.uploader?.username}</p>
        </div>
      }
    </div>
  )
}