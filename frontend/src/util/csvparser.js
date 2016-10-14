export default function parseCSV(text) {

    const lines = [];
    
    let line = [];
    let line_idx = 1;
    let token = '';
    let inside_doublequote;

    function pushLine(end=false) {
        if (token) {
            line.push(token);
            token ='';
        }

        if (!end || line.length) {

            if (lines.length && lines[0].length !== line.length) {
                throw new Error(`Line ${line_idx} has different number of fields ${line.length} to header ${lines[0].length}`);
            }
            lines.push(line);
            line = [];
        }

        line_idx++;
    }

    for (let i = 0; i < text.length; i++) {
        const char = text[i];


        //behaviour if inside double quote
        if (inside_doublequote) {
            if (char === '"') {
                
                //handle double quote
                if (i < text.length -1 && text[i+1] === '"') {
                    token += '"';
                    i++;
                //not ending field with double quote is an error
                } else if (i < text.length -1 && (',\n\r').indexOf(text[i + 1]) === -1) {
                    throw new Error(`Double quote inside field, line=${line_idx}`);
                } else {
                    inside_doublequote = false;
                }
            } else {
                token += char;
            }
        } else {
            //enter double quote state
            if (char === '"') {
                if (token) {
                    throw new Error(`Double quote inside field, line=${line_idx}`);
                }
                inside_doublequote = true;
            } else if (char === ',') {
                line.push(token);
                token = '';
            } else if (char === '\n') {
                if (i !== 0 && text[i - 1] === ',') {
                    throw new Error(`Last symbol of line cannot be separator, line=${line_idx}`);
                }
                pushLine();
            } else {
                token += char;
            }
        }
    }

    //handle final line
    pushLine(true);

    return lines;
}