import { albumsService } from "../services/albumsService.js";

export const albumsController = {
  getCsv: async (req, res) => {
    const csv = await albumsService.getAlbumsCsv();
    res.header("Content-Type", "text/csv");
    res.send(csv);
  },
};
