import parseCSV from '../frontend/src/util/csvparser';


function csvgoodcase(input, output) {
    return function() {
        expect(parseCSV(input)).toEqual(output);
    }
}

function csvbadcase(input, errormsg) {
    return function() {
        expect(() => parseCSV(input)).toThrowError(errormsg);
    }
}

describe("CSV parser", function() {

    //happy paths

    it("should handle newline, separator tokens", csvgoodcase( 
        `ONE,TWO\n1,2`,
        [['ONE','TWO'],['1','2']]
    ));

    it("should handle quoted double quotes", csvgoodcase(
        `"IT'S ""GREAT""!"\nyes`,
        [["IT'S \"GREAT\"!"], ['yes']]
    ));

    it("quoted is quoted", csvgoodcase(
        `"THIS, IS A\n SINGLE TOKEN"`,
        [['THIS, IS A\n SINGLE TOKEN']]
    ));

    it ("white space is not ignored", csvgoodcase(
        ` ONE, TWO \n1, 2`,
        [[' ONE', ' TWO '], ['1', ' 2']]
    ));

    //sad paths

    it("can't have quote in middle of token", csvbadcase(
        `WAT " WAT`,
        'Double quote inside field, line=1'
    ));

    it("can't have different line sizes", csvbadcase(
        `ONE,TWO\nONE,TWO,THREE`,
        'Line 2 has different number of fields 3 to header 2'
    ))

    it("last symbol of a line can't be a sep", csvbadcase(
        `ONE,TWO,\n`,
        'Last symbol of line cannot be separator, line=1'
    ))

});