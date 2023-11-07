const Airtable = require("airtable");
const base = new Airtable({
  apiKey: process.env.NEXT_PUBLIC_AIRTABLE_PAT_KEY,
}).base(process.env.NEXT_PUBLIC_AIRTABLE_BASE_KEY);

const table = base(process.env.NEXT_PUBLIC_AIRTABLE_TABLE_KEY);

console.log({ table });

const createCoffeeStore = async (req, res) => {
  console.log({ req });
  if (req.method === "POST") {
    //find a record
    const { id, name, neighbourhood, address, ImgUrl, voting } = req.body;

    try {
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id=${id}`,
        })
        .firstPage();

      console.log({ findCoffeeStoreRecords });

      if (findCoffeeStoreRecords.length !== 0) {
        const records = findCoffeeStoreRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json(records);
      } else {
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
        const records = createRecords.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.json({ message: "create a record", records });
      }
    } catch (error) {
      console.error("Error finding store", error);

      res.json({ message: "Something went wrong" });
    }
  }
};

export default createCoffeeStore;
