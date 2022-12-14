const puppeteer = require('puppeteer');
const hbs = require('handlebars')
const fs = require('fs-extra')

export const createPdf = async (filePath: string, options = {}, data = {}) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    hbs.registerHelper("ifCond", function (
        v1: any, 
        operator: any, 
        v2: any, 
        options:any
      ) {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(data) : options.inverse(data);
        case "===":
          return v1 === v2 ? options.fn(data) : options.inverse(data);
        case "!=":
          return v1 != v2 ? options.fn(data) : options.inverse(data);
        case "!==":
          return v1 !== v2 ? options.fn(data) : options.inverse(data);
        case "<":
          return v1 < v2 ? options.fn(data) : options.inverse(data);
        case "<=":
          return v1 <= v2 ? options.fn(data) : options.inverse(data);
        case ">":
          return v1 > v2 ? options.fn(data) : options.inverse(data);
        case ">=":
          return v1 >= v2 ? options.fn(data) : options.inverse(data);
        case "&&":
          return v1 && v2 ? options.fn(data) : options.inverse(data);
        case "||":
          return v1 || v2 ? options.fn(data) : options.inverse(data);
        default:
          return options.inverse(options);
      }
    });

    hbs.registerHelper({
      eq: (v1: any, v2: any) => v1 === v2,
      ne: (v1: any, v2: any) => v1 !== v2,
      lt: (v1: number, v2: number) => v1 < v2,
      gt: (v1: number, v2: number) => v1 > v2,
      lte: (v1: number, v2: number) => v1 <= v2,
      gte: (v1: number, v2: number) => v1 >= v2,
      and() {
          return Array.prototype.every.call(arguments, Boolean);
      },
      or() {
          return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
      }
    });
    
    const html = await fs.readFile(filePath, 'utf8');
    const content = hbs.compile(html)(data);
    await page.setContent(content);

    const buffer = await page.pdf({
      // path: 'output-abc.pdf',
      format: 'a4',
      printBackground: true,
      margin: {
        left: '10mm',
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
      },
      ...options,
    });
    await browser.close();
    // process.exit();
    return buffer;
    } catch (e) {
    console.log(e);
    }
};
