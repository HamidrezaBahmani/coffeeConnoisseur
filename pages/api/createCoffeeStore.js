import {
  getMinifiedRecords,
  table,
  findRecordByFilter,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    const { id, name, neighbourhood, address, ImgUrl, voting } = req.body;

    try {
      if (id) {
        const records = await findRecordByFilter(id);
        if (records.length !== 0) {
          res.json(records);
        } else {
          if (name) {
            const createRecords = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighbourhood,
                  voting,
                  ImgUrl,
                },
              },
            ]);
            const records = getMinifiedRecords(createRecords);

            res.json({ message: "create a record", records });
          } else {
            res.status(400);
            res.json({ message: " name is missing" });
          }
        }
      } else {
        res.status(400);
        res.json({ message: "Id is missing" });
      }
    } catch (error) {
      console.error("Error creating or finding store", error);
      res.status(500);
      res.json({ message: "Error creating or finding store" });
    }
  }
};

export default createCoffeeStore;
