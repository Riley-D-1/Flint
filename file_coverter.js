import marked from "marked";
import html2pdf from 'html2pdf.js';

function convert(fileInput){
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
                reader.onload = (e) => {
                    const fileContent = e.target.result;}
                }
            });
    const htmlContent = marked.parse(fileContent);
    html2pdf().from(htmlContent).save('document.pdf');
    const options = {
        margin: 1,
        filename: 'test.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    html2pdf().set(options).from(container).save();
}