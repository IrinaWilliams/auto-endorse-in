import expect from 'chai';

describe('Client', function () {


    it('Get title', function () {
      browser.url('/');
      let title = browser.getTitle();
      assert.equal(title, '');
    })

    it('Favicon', function () {
      browser.url('/favicon.ico');
      let icon = $('img');
      let width = icon.getCSSProperty('width').parsed.value;
      let height = icon.getCSSProperty('height').parsed.value;
      let size = `${width}x${height}`;
      assert.equal(size, '256x256');
    })

  });