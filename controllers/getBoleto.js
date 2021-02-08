const puppeteer = require('puppeteer');

module.exports = async (req, res) => {
    (async () => {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage()
        await page.goto(req.body.link)
        page.type('#ctl00_cphCuerpo_txt_CPF_CNPJ', req.body.cpf);
        await page.waitForTimeout(1000);
        page.click('#ctl00_cphCuerpo_cmd_Verificar')
        await page.waitForTimeout(2000);
        const links = await page.evaluate(function getUrls() {
            return Array.from(document.querySelectorAll('body > div > div > div >div.modal-body > div > table.wmax > tbody > tr > td > div ').values()).
              map(el => el.innerHTML);
          });
          const CNPJ = await page.evaluate(function getUrls() {
            return Array.from(document.querySelectorAll('.s1').values()).
              map(el => el.innerHTML);
          });
          var retorno = JSON.parse(`{"nossoNumero":"${links[4]}","linhaDigitavel":"${links[21]}", "numDocumento":"${links[6]}",
        "agenciaCodigoCedente":"${links[14]}", "carteira": "${links[42]}", "CNPJ":"${CNPJ[2]}"}`);
          res.send(retorno);
        await browser.close();
    })();
}