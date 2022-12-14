# NEST HTML PDF

A package to generate PDF files from HTML for NestJs

## Installation

`npm i @saemhco/nestjs-html-pdf`

## Usage

### Initialization

service file

```
import { Injectable } from '@nestjs/common';
import { createPdf } from '@saemhco/nestjs-html-pdf';
import * as path from 'path';
```

call the function create createPdf([filePath], [options], [data])

- `filePath` <[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type 'String')> It's required. HTML file path.
- `options` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object 'Object')> It's optional.
  Default value:

```
{
    format: 'a4',
    printBackground: true,
    margin: {
        left: '10mm',
        top: '10mm',
        right: '10mm',
        bottom: '10mm',
    }
}
```

For more values [see this link](https://github.com/saemhco/master/pdf-options.txt)

- `data` <[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object 'Object')> It's optional.

### Quick use

service file

```
firstExample() {
    const filePath = path.join(process.cwd(), 'templates', 'pdf-profile.hbs');
    return createPdf(filePath);
}
```

path/pdf-profile.hbs

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profile</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
        img {
                width: 50%;
                height: auto;
            }
        .bg-black {
            background: #000;
        }

        .skill-block {
            width: 30%;
        }

        .skill-block {
            padding: 32px !important;
        }

        body {
            background-color: #eeeeee;
        }
    </style>
  </head>
    <body>
        <div class="container mt-5 mb-5">
            <div class="row no-gutters text-center">
                <div class="col-12"><img src="https://cdn0.iconfinder.com/data/icons/fillicons-information-technology/1550/programmer_software_developer-512.png"></div>
                <div class="col-12">
                    <div class="d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between align-items-center p-5 bg-dark text-white">
                            <h3 class="display-5">Saúl Escandón</h3>
                        </div>
                        <div class="p-3 bg-black text-white">
                            <h6>Sistem enginer &amp; Developer</h6>
                        </div>
                        <div class="d-flex flex-row text-white">
                            <div class="p-4 bg-primary text-center skill-block">
                                <h4>90%</h4>
                                <h6>JavaScript</h6>
                            </div>
                            <div class="p-3 bg-success text-center skill-block">
                                <h4>70%</h4>
                                <h6>NodeJs</h6>
                            </div>
                            <div class="p-3 bg-warning text-center skill-block">
                                <h4>80%</h4>
                                <h6>HTML</h6>
                            </div>
                            <div class="p-3 bg-danger text-center skill-block">
                                <h4>75%</h4>
                                <h6>PHP</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
```

controller

```
@Get('pdf')
async generatePdf(@Res() res) {
const buffer = await this.appService.firstExample();
res.set({
    // pdf
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename=pdf.pdf`,
    'Content-Length': buffer.length,
    // prevent cache
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: 0,
});
res.end(buffer);
}
```

Result
![image](https://user-images.githubusercontent.com/26281994/207532590-f4f7a0db-a620-4912-8137-3803cf748c66.png)

### Other example

service file

```
secondExample() {
    const data = {
    title: 'My PDF file',
    status: 'paid',
    invoiceId: '#123-123',
    customerName: 'Saúl Escandón',
    customerAddress: '1234 Main St',
    customerCity: 'Huánuco',
    customerState: 'Huánuco',
    customerCountry: 'Perú',
    customerPhone: '555-555-5555',
    items: [
            {
            description: 'custom suit',
            detail: {
                color: 'blue',
                size: '42',
            },
            price: {
                price0: 1500.0,
                price: 1050.0,
                save: 25,
            },
            quantity: 1,
            image:
                'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/new/img(4).webp',
            },
            {
            description: 'playstation 5',
            detail: {
                color: 'white',
                size: '45cmx45cm',
            },
            price: {
                price0: 500.0,
                price: 250.0,
                save: 50,
            },
            quantity: 2,
            image:
                'https://promart.vteximg.com.br/arquivos/ids/931599-1000-1000/image-b08a9ed36e114598bc56d7d4a5e7dd2d.jpg?v=637569550232800000',
            },
      ],
      subTotal: 1550.0,
      shipping: 15.0,
      total: 1565.0,
    };
    const options = {
      format: 'A4',
      displayHeaderFooter: true,
      margin: {
        left: '10mm',
        top: '25mm',
        right: '10mm',
        bottom: '15mm',
      },
      headerTemplate: `<div style="width: 100%; text-align: center;"><span style="font-size: 20px;">@saemhco CORP</span><br><span class="date" style="font-size:15px"><span></div>`,
      footerTemplate:
        '<div style="width: 100%; text-align: center; font-size: 10px;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>',
      landscape: true,
    };
    const filePath = path.join(process.cwd(), 'templates', 'pdf-invoice.hbs');;
    return createPdf(filePath, options, data);
}
```

path/pdf-invoice.hbs

```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{title}}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  </head>
    <body>
        <div class="card">
            <div class="card-body">
                <div class="container mb-5 mt-3">
                <div class="row d-flex align-items-baseline">
                    <div class="col-xl-9">
                    <p style="color: #7e8d9f;font-size: 20px;">Invoice &gt;&gt; <strong>ID: {{invoiceId}}</strong></p>
                    </div>
                </div>
                <div class="container">
                    <div class="col-md-12">
                    </div>
                    <div class="row">
                    <div class="col-8">
                        <ul class="list-unstyled">
                        <li class="text-muted">To: <span style="color:#8f8061 ;">{{customerName}}</span></li>
                        <li class="text-muted">{{customerAddress}} | {{customerState}}, {{customerCountry}}</li>
                        <li class="text-muted"><i class="fas fa-phone"></i> {{customerPhone}}</li>
                        </ul>
                    </div>
                    <div class="col-4">
                        <ul class="list-unstyled">
                        <li class="text-muted"><i class="fas fa-circle" style="color:#8f8061 ;"></i> <span
                            class="fw-bold">ID:</span>#123-456</li>
                        <li class="text-muted"><i class="fas fa-circle" style="color:#8f8061;"></i>
                            <span class="me-1 fw-bold">Status:</span>
                                {{#ifCond status "===" "paid"}}
                                <span class="badge bg-warning text-black fw-bold">Unpaid</span>
                                {{/ifCond}}
                                 {{#ifCond status "===" "unpaid"}}
                                <span class="badge bg-success text-black fw-bold">Paid</span>
                                {{/ifCond}}
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div class="row my-2 mx-1 justify-content-center">
                        {{#each items}}
                        <div class="col-md-2 mb-4 mb-md-0">
                            <div class="bg-image ripple rounded-5 mb-4 overflow-hidden d-block" data-ripple-color="light">
                            <img src="{{image}}" class="w-100" height="100px" alt="Elegant shoes and shirt" />
                            <a href="#!">
                                <div class="hover-overlay">
                                <div class="mask" style="background-color: hsla(0, 0%, 98.4%, 0.2)"></div>
                                </div>
                            </a>
                            </div>
                        </div>
                        <div class="col-md-7 mb-4 mb-md-0">
                            <p class="fw-bold">{{description}}</p>
                            <p class="mb-1">
                            <span class="text-muted me-2">Size:</span><span>{{detail.size}}</span>
                            </p>
                            <p>
                            <span class="text-muted me-2">Color:</span><span>{{detail.color}}</span>
                            </p>
                        </div>
                        <div class="col-md-3 mb-4 mb-md-0">
                            <h5 class="mb-2">
                            <s class="text-muted me-2 small align-middle">${{price.price0}}</s><span class="align-middle">${{price.price}}</span>
                            </h5>
                            <p class="text-danger"><small>You save {{price.save}}%</small></p>
                        </div>
                        {{/each}}

                    <hr>
                    </div>
                    <div class="row">
                        <div class="col-xl-3">
                            <ul class="list-unstyled">
                            <li class="text-muted ms-3"><span class="text-black me-4">SubTotal</span>${{subTotal}}</li>
                            <li class="text-muted ms-3 mt-2"><span class="text-black me-4">Shipping</span>${{shipping}}</li>
                            </ul>
                            <p class="text-black float-start"><span class="text-black me-3"> Total Amount</span><span
                                style="font-size: 20px;">${{total}}</span></p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </body>
</html>
```

controller

```
@Get('pdf')
async generatePdf2(@Res() res) {
    const buffer = await this.appService.secondExample();
    res.set({
      // pdf
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=pdf.pdf`,
      'Content-Length': buffer.length,
      // prevent cache
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: 0,
    });
    res.end(buffer);
  }
}
```

Result
![image](https://user-images.githubusercontent.com/26281994/207534170-ad8ffd45-3385-4c3a-a579-aad5b585e1eb.png)

### More details

---

| JavaScript      | HTMLBars OP1           | HTMLBars OP2                  |
| --------------- | ---------------------- | ----------------------------- |
| `if (a === b)`  | `{{#if (eq a b)}}`     | `{{#ifCond var1 '===' var2}}` |
| `if (a !== b)`  | `{{#if (not-eq a b)}}` | `{{#ifCond var1 '!==' var2}}` |
| `if (a && b)`   | `{{#if (and a b)}}`    | `{{#ifCond var1 '&&' var2}}`  |
| `if (a > b)`    | `{{#if (gt a b)}}`     | `{{#ifCond var1 '>' var2}}`   |
| `if (a >= b)`   | `{{#if (gte a b)}}`    | `{{#ifCond var1 '>=' var2}}`  |
| `if (a < b)`    | `{{#if (lt a b)}}`     | `{{#ifCond var1 '<' var2}}`   |
| `if (a <= b)`   | `{{#if (lte a b)}}`    | `{{#ifCond var1 '<=' var2}}`  |
| `if (a && b)`   | `{{#if (and a b)}}`    | `{{#ifCond var1 '&&' var2}}`  |
| `if (a \|\| b)` | `{{#if (or a b)}}`     | `{{#ifCond var1 \|\| var2}}`  |
