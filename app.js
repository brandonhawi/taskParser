const fs = require('fs');
const PDFDocument = require('pdfkit');
const doc = new PDFDocument();

fs.readFile(process.env.TASKS_LOCATION, "utf-8", (err, data) => {
    if (err) throw err;
    const tasks = JSON.parse(data);
    console.log(tasks);
    doc.pipe(fs.createWriteStream(process.env.TASKS_OUTPUT));
    doc.text("Brandon Hawi")
        .text("Wafer Foundry Engineering", {
            oblique: true
        })
        .fontSize(16).text("Weekly Report", {
            align: "center",

        })
        .moveDown()
        .fontSize(12).text("Tasks Completed in the Past 7 Days:")
        .moveDown()
        .list(tasks["tasksCompleted"], {
            textIndent: 20
        })
        .moveDown()
        .text("To Be Done:")
        .moveDown()
        .list(tasks["toBeDone"], {
            textIndent: 20
        });
    doc.end();
});