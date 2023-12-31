interface DataProp {
  id: number;
  title: string;
  brand: string;
  img: string;
  desc: string;
  director: string;
  production: string;
  cinematographer: string;
  editor: string;
  date: string;
  playbackId: string; // Add the playbackId property here
}

interface CardProps {
  itemsData: DataProp[];
}

const ItemsData = [
  {
    id: 1,
    title: "buttermilk pancakes",
    brand: "Opel",
    img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?q=80&w=2533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: `I'm baby woke mlkshk wolf bitters live-edge blue bottle, hammock freegan copper mug whatever cold-pressed `,
    director: "x",
    production: "Circa9",
    cinematographer: "z",
    editor: "e",
    date: "2023-11-18T08:30:00Z",
    playbackId: "grsBtE2qkMOZHEhGvJHtpI2t1101so00eRqMF6PjKjPzY",
    videoTitle: "Super Interesting Video 1",
  },
  {
    id: 2,
    title: "Cube",
    brand: "Opel",
    img: "https://images.unsplash.com/photo-1700041829045-530ffd99f435?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8",
    director: "z",
    production: "Cube Productions",
    cinematographer: "z",
    editor: "e",
    desc: `vaporware iPhone mumblecore selvage raw denim slow-carb leggings gochujang helvetica man braid jianbing. Marfa thundercats `,
    date: "2023-10-25T14:45:00Z",
    playbackId: "o5LazCGzbmzxdjlfbz2aw2mJbOdaK2gfu3dmkoOR8a00",
    videoTitle: "Super Interesting Video 2",
  },
  {
    id: 3,
    title: "Be Like Water",
    brand: "Opel",
    img: "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?q=80&w=2533&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    director: "z",
    production: "Solo Dev",
    cinematographer: "z",
    editor: "e",
    desc: `ombucha chillwave fanny pack 3 wolf moon street art photo booth before they sold out organic viral.`,
    date: "2023-10-25T14:45:00Z",
    playbackId: "T4s00Lm9KcwYo00pd5LT01ucB2QKJAw90000sDqfxTUatL028",
    videoTitle: "Super Interesting Video 2",
  },
];
export default ItemsData;
