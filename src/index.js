const express = require("express");
const app = express();
const pdf = require("html-pdf");
const ejs = require("ejs");


app.use(express.json());

app.get("/", (req, res) => {

    ejs.renderFile("./templates/index.ejs", { name: "Andrew"}, (err, html) => {

        if (err) {
            return res.status(500).json({ message: "Deu pau no server" });
        }

        const options = {
            format: "A4",
            border: {
                right: "8"
            }
        };

        pdf.create(html, options).toFile("./uploads/report.pdf", (error, response) => {
            if (!error) return res.json({ message: "PDF gerado com sucesso!" });
            else return res.json({ message: "Falha ao gerar o PDF"});
        })
    });
});




app.listen(3000, () => {
    console.log("Server runnig at port 3000...");
})