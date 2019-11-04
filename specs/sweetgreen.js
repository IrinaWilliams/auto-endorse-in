import {expect} from 'chai';

const sel = {
    product: '//div[contains(@id,"ember")]//div[contains(@class,"card-inner ")]',
    prodTitle: '//h2',
    prodDescr: '//p',
    prodPrice: '//span[@class="product-cost"]',
    prodCal: '//span[@class="product-cals"]'
}

describe('', () => {
    before(() => {
    browser.url('https://order.sweetgreen.com/culver-city-the-lab/menu');
    });
    
    it('verify that product contain .....', () => {
        const allProduct = $$(sel.product);
        allProduct.forEach(prod => {
            const hasTitle = prod.$(sel.prodTitle).getText();
            console.log(hasTitle);
        })
    });

});