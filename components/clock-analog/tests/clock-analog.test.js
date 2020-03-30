describe('clock-analog component', () => {
    beforeAll(() => {
      require('../dist/clock-analog');
      document.body.appendChild(document.createElement('clock-analog'));
      return customElements.whenDefined('clock-analog')
        .then(() => {
          this.clock = document.querySelector('clock-analog');
        });
    });

    it('creates', () => {
      expect(this.clock).toBeDefined();
    });
  });
