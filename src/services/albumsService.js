import fs from "fs/promises";

export const albumsService = {
  getAlbumsCsv: async () => {
    //API externa
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const albums = await response.json();

    //los primeros 15
    const primeros15 = albums.slice(0, 15);


    const header = "userId,id,title\n";
    const rows = primeros15
      .map(a => `${a.userId},${a.id},"${a.title.replace(/"/g, '""')}"`)
      .join("\n");

    const csv = header + rows;


    await fs.writeFile("./data/albums_15.csv", csv, "utf-8");

    return csv;
  },
};
