describe('equals service', function () {

    var EqualsService;

    beforeEach(module('mobi.ui.equals'));

    beforeEach(inject(function (_EqualsService_) {
        EqualsService = _EqualsService_;
    }));


    it('should return true for same string and false for different string', inject(function () {
        expect(EqualsService.isEqual('string', 'string')).toBeTruthy();
        expect(EqualsService.isEqual('string', 'anotherstring')).toBeFalsy();
    }));

    it('should return true for same simple object and false for different simple object', inject(function () {
        var o1 = {attr: 'attr'},
            o2 = {attr: 'attr'},
            o3 = {attr: 'anotherattr'};

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o3)).toBeFalsy();
    }));

    it('should return true for same complex object and false for different complex object', inject(function () {
        var o1 = {attr: {attr: 1}},
            o2 = {attr: {attr: 1}},
            o3 = {attr: {attr: 1, attr2: 'attr'}};

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o3)).toBeFalsy();
    }));

    it('should return true for same array and false for different array', inject(function () {
        var o1 = [1, 2],
            o2 = [1, 2],
            o3 = [1, '2'],
            o4 = [1, '2', 3];

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o3)).toBeFalsy();
        expect(EqualsService.isEqual(o3, o4)).toBeFalsy();
    }));

    it('should return true for same object with array and false for different object with array', inject(function () {
        var o1 = { attr: 1, myarray: [1, {attr: 5}]},
            o2 = { attr: 1, myarray: [1, {attr: 5}]},
            o3 = { attr: 1, myarray: [1, {attr: '5'}]},
            o4 = { attr: 1, myarray: [1, '2', {attr: 5}]};

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o3)).toBeFalsy();
        expect(EqualsService.isEqual(o3, o4)).toBeFalsy();
    }));

    it('should return true for null, undefined and empty string', inject(function () {
        var o1 = { attr2: null, myarray: [1, {attr: {}}], foo: {attr: null}},
            o2 = { attr: null, attr3: '', myarray: [1, {attr: {attr: null}}], foo: {}};

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();

    }));

    it('should ignore angular hashkeys', inject(function () {
        var o1 = { attr: 'attr'},
            o2 = { attr: 'attr', $$hashKey: 'xy' };

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();

    }));

    it('should ignore _mobiTmp$', inject(function () {
        var o1 = { attr: 'attr'},
            o2 = { attr: 'attr', _mobiTmp$SecretKey: 'xy' };

        expect(EqualsService.isEqual(o1, o1)).toBeTruthy();
        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();

    }));

    it('should not manipulate objects when workingOnCopies set', function () {
        var o1 = { attr: 'attr', attr2: ''},
            o2 = { attr: 'attr', attr3: ''};

        expect(EqualsService.isEqual(o1, o2)).toBeTruthy();
        expect(o1.attr2).toBeUndefined();
        expect(o2.attr3).toBeUndefined();

        o1 = { attr: 'attr', attr2: ''};
        o2 = { attr: 'attr', attr3: ''};

        expect(EqualsService.isEqual(o1, o2, true)).toBeTruthy();
        expect(o1.attr2).toBe('');
        expect(o2.attr3).toBe('');
    });

});

