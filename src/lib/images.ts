export type Category = {
  name: string,
  id: string,
  description: string,
}

export type ProfilePicture = {
  id?: number,
  name: string,
  categories: string[],
  images: { url: string, title: string, id: number, downloads?: number | null }[],
  uploader?: { username: string, id: number },
}

export type Wallpaper = {
  name: string,
  type: string,
  categories: string[],
  images: string[],
  uploader?: string
}

// 'bxb'
// 'funny'
// 'gxb'
// 'gxg'
// 'humananimal'
// 'nbxnb'
// 'onesie'
// 'sanrio'
// 'spring'
// 'summer'
// 'fall'
// 'winter'
// 'red'
// 'orange'
// 'yellow'
// 'green'
// 'blue'
// 'purple'
// 'white'
// 'black'
// 'brown'
// 'pink'
// 'doodles'
// 'anime'
// 'cartoon'
// 'animal'
// 'gxgxb'
// 'gxbxb'
// 'gxgxg'
// 'bxbxb'

//  New Category
//  {
//    name: "",
//    id: "",
//    description: ""
//  }, 

export const categories: Category[] = [
  {
    name: "Boy x Boy",
    id: "bxb",
    description: "This category is for profile pictures featuring male characters in romantic or friendly relationships with other male characters."
  },
  {
    name: "Funny",
    id: "funny",
    description: "Choose this category for profile pictures that are humorous, comedic, or meant to make people laugh."
  }, 
  {
    name: "Girl x Boy",
    id: "gxb",
    description: "This category is for profile pictures depicting male and female characters together in various contexts."
  }, 
  {
    name: "Girl x Girl",
    id: "gxg",
    description: "Select this category for profile pictures featuring female characters in romantic or friendly relationships with other female characters."
  }, 
  {
    name: "Human Animal Hybrid",
    id: "humananimal",
    description: "If your profile picture includes characters who are a mix of humans and animals, this is the category to choose."
  }, 
  {
    name: "Non Binary x Non Binary",
    id: "nbxnb",
    description: "This category is for profile pictures featuring non-binary or genderqueer characters in relationships or settings that reflect their identities."
  }, 
  {
    name: "Onesie",
    id: "onesie",
    description: "For profile pictures showcasing characters wearing onesies or one-piece pajamas in various cute or cozy styles."
  }, 
  {
    name: "Sanrio",
    id: "sanrio",
    description: "Choose this category for profile pictures featuring popular Sanrio characters, known for their cute and charming designs."
  }, 
  {
    name: "Spring",
    id: "spring",
    description: "This category is for profile pictures capturing the spirit of the spring season, including themes of renewal, growth, and blossoming."
  }, 
  {
    name: "Summer",
    id: "summer",
    description: "Select this category for profile pictures that evoke the warmth, fun, and leisure of the summer season."
  }, 
  {
    name: "Fall",
    id: "fall",
    description: ""
  }, 
  {
    name: "Winter",
    id: "winter",
    description: ""
  }, 
  {
    name: "Red",
    id: "red",
    description: ""
  }, 
  {
    name: "Orange",
    id: "orange",
    description: ""
  },
  {
    name: "Yellow",
    id: "yellow",
    description: ""
  }, 
  {
    name: "Green",
    id: "green",
    description: ""
  }, 
  {
    name: "Blue",
    id: "blue",
    description: ""
  }, 
  {
    name: "Purple",
    id: "purple",
    description: ""
  }, 
  {
    name: "Black",
    id: "black",
    description: ""
  }, 
  {
    name: "White",
    id: "white",
    description: ""
  }, 
  {
    name: "Brown",
    id: "brown",
    description: ""
  }, 
  {
    name: "Pink",
    id: "pink",
    description: ""
  },
  {
    name: "Doodles",
    id: "doodles",
    description: ""
  },
  {
    name: "Anime",
    id: "anime",
    description: ""
  },
  {
    name: "Animal",
    id: "animal",
    description: ""
  },
  {
    name: "Girl x Girl x Boy",
    id: "gxgxb",
    description: ""
  },
  {
    name: "Girl x Boy x Boy",
    id: "gxbxb",
    description: ""
  },
  {
    name: "Girl x Girl x Girl",
    id: "gxgxg",
    description: ""
  },
  {
    name: "Boy x Boy x Boy",
    id: "bxbxb",
    description: ""
  }, 
  {
    name: "Cartoon",
    id: "cartoon",
    description: ""
  },
];

//  New Image
//  { 
//    name: "",
//    folder: "",
//    categories: [""], 
//    images: [""],
//    uploader: ""
//  }

// export const images: ProfilePicture[] = [
//   { 
//     name: "Bubu & Dudu Straw",
//     categories: ["nbxnb", "white", "brown", "purple", "animal"], 
//     images: ["bubu_straw.png", "dudu_straw.png"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Bubu & Dudu Noms",
//     categories: ["nbxnb", "white", "brown", "animal"],
//     images: ["bubu_nom.png", "dudu_nom.png"],
//     uploader: 'nobisnownari'
//   },
//     { 
//     name: "Bubu & Dudu Egg",
//     categories: ["nbxnb", "white", "brown", "pink", "animal"], 
//     images: ["bubu_egg.png", "dudu_egg.png"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Bubu & Dudu Mask",
//     categories: ["nbxnb", "white", "brown", "black", "animal"], 
//     images: ["bubu_mask.png", "dudu_mask.png"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Bubu & Dudu Swim",
//     categories: ["nbxnb", "summer", "white", "brown", "blue", "animal"], 
//     images: ["bubu_swim.png", "dudu_swim.png"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Dog",
//     categories: ["gxb", "onesie", "white", "black"], 
//     images: ["girl_dog.png", "boy_dog.png"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Bunny & Bear Flower",
//     categories: ["nbxnb", "spring", "white", "brown", "pink", "yellow", "animal"], 
//     images: ["bunny_flower.jpg", "bear_flower.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Strawberry",
//     categories: ["gxb", "pink", "brown"], 
//     images: ["girl_strawberry.jpg", "boy_strawberry.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Girl Flower",
//     categories: ["gxg", "spring", "brown", "pink"], 
//     images: ["gg_flower1.jpg", "gg_flower2.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Bunny",
//     categories: ["gxb", "spring", "humananimal", "white", "orange", "yellow", "orange"], 
//     images: ["girl_bunny.jpg", "boy_bunny.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Pompom",
//     categories: ["gxb", "sanrio", "yellow", "brown"], 
//     images: ["girl_pompom.jpg", "boy_pompom.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Pochacco",
//     categories: ["gxb", "sanrio", "humananimal", "white", "blue"], 
//     images: ["girl_pochacco.jpg", "boy_pochacco.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Hello Kitty",
//     categories: ["gxb", "sanrio", "pink", "white"], 
//     images: ["girl_hello.jpg", "boy_hello.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Laugh",
//     categories: ["gxb", "funny", "white", "brown"], 
//     images: ["girl_laugh.jpg", "boy_laugh.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Flower",
//     categories: ["gxb", "spring", "pink", "brown"], 
//     images: ["girl_pflower.jpg", "boy_pflower.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Bunch Flower",
//     categories: ["gxb", "doodles", "white", "pink"], 
//     images: ["girl_bunchflower.jpg", "boy_bunchflower.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Green Dino",
//     categories: ["gxb", "onesie", "green"], 
//     images: ["girl_gdino.jpg", "boy_gdino.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Red Dino",
//     categories: ["gxb", "onesie", "red"], 
//     images: ["girl_rdino.jpg", "boy_rdino.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Bunny & Bear Sleep",
//     categories: ["nbxnb", "animal", "brown", "pink", "yellow"], 
//     images: ["bun_sleep.jpg", "bear_sleep.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Demon Slayer One",
//     categories: ["gxb", "anime", "red", "black"], 
//     images: ["girl_dslayer.jpg", "boy_dslayer.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Kamisama Kiss",
//     categories: ["gxb", "anime", "brown", "white", "funny"], 
//     images: ["girl_kami.jpg", "boy_kami.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Gaming",
//     categories: ["gxb", "brown", "pink"], 
//     images: ["girl_game.jpg", "boy_game.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Surprised Dino",
//     categories: ["gxb", "onesie", "pink", "blue"], 
//     images: ["girl_odino.jpg", "boy_odino.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Girl & Boy Lolipop",
//     categories: ["gxb", "green", "brown"], 
//     images: ["girl_lolipop.jpg", "boy_lolipop.jpg"],
//     uploader: 'nobisnownari'
//   }, 
//   { 
//     name: "Girl & Girl & Boy Boba",
//     categories: ["gxgxb", "brown", "black", "pink"], 
//     images: ["trioggb_g1boba.jpg", "trioggb_g2boba.jpg", "trioggb_bboba.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Boy & Boy Cuddling",
//     categories: ["bxb", "black", "white"], 
//     images: ["bb_cuddleboy1.jpg", "bb_cuddleboy2.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Boy & Boy Rain",
//     categories: ["bxb", "blue", "white", "black"], 
//     images: ["bb_rainboy1.jpg", "bb_rainboy2.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Boy & Boy Sleeping",
//     categories: ["bxb", "yellow"], 
//     images: ["bb_sleepboy1.jpg", "bb_sleepboy2.jpg"],
//     uploader: 'nobisnownari'
//   },
//   { 
//     name: "Boy & Boy Onesies",
//     categories: ["bxb", "onesie", "white", "purple"], 
//     images: ["bb_onesboy1.jpg", "bb_onesboy2.jpg"],
//     uploader: 'nobisnownari'
//   },
// ]

// export const wallpapers: Wallpaper[] = [
//   { 
//     name: "Spongebob Heart",
//     type: "phone",
//     categories: ["nbxnb", "cartoon", "pink", "yellow"], 
//     images: ["spongebobheart1.jpg", "spongebobheart2.jpg"],
//     uploader: "nobisnownari"
//   },
//   { 
//     name: "Lilo and Stitch Halloween",
//     type: "phone",
//     categories: ["nbxnb", "fall", "blue", "black", "cartoon"], 
//     images: ["lilostitch_ween1.jpg", "lilostitch_ween2.jpg"],
//     uploader: "nobisnownari"
//   },
//   { 
//     name: "Biting Cats",
//     type: "phone",
//     categories: ["nbxnb", "animal", "white", "orange"], 
//     images: ["catbite1.jpg", "catbite2.jpg"],
//     uploader: "nobisnownari"
//   },
//   { 
//     name: "Starfire and Raven",
//     type: "phone",
//     categories: ["gxg", "pink", "purple", "black"], 
//     images: ["starrav1.jpg", "starrav2.jpg"],
//     uploader: "nobisnownari"
//   },
//   { 
//     name: "Sun and Moon",
//     type: "phone",
//     categories: ["gxg", "yellow", "blue", "cartoon"], 
//     images: ["sunmoon_sun.jpg", "sunmoon_moon.jpg"],
//     uploader: "nobisnownari"
//   },
//   { 
//     name: "Angel and Stitch 1",
//     type: "phone",
//     categories: ["gxb", "pink", "blue", "cartoon"], 
//     images: ["angelstitch_angel.jpg", "angelstitch_stitch.jpg"],
//     uploader: "nobisnownari"
//   },
//   { 
//     name: "Angel and Stitch",
//     type: "phone",
//     categories: ["gxb", "pink", "blue", "cartoon"], 
//     images: ["angelstitch2_stitch.jpg", "angelstitch2_angel.jpg"],
//     uploader: "nobisnownari"
//   },
// ]

// export function filterImagesByCategories(selectedCategories: any[]) {
//   if (selectedCategories.length === 0) {
//     return images;
//   }

//   return images.filter((image) =>
//     selectedCategories.every((category) => image.categories.includes(category.id))
//   );
// }
