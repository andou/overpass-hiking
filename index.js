// Requires
const fs = require('fs');
const path = require('path');
const query_overpass = require('query-overpass');
const sprintf = require("sprintf-js").sprintf;
const clc = require("cli-color");
// Colors
const error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

// Arguments
const argv = require('minimist')(process.argv.slice(2));
var query_file = '';

// Verifico se è stata specificata una query
if (typeof argv.query != 'undefined') {
    var query_file = get_query_file_name(argv.query);
} else {
    console.log(error('Please specify a query'));
    process.exit();
}

var out_file = get_out_file_name(argv.query);

// Controllo se è stato specificato un file di output
if (typeof argv.out != 'undefined') {
    out_file = sprintf("retrieved-data/%d-%s", Date.now, argv.out);
}

var out_res = false;

// Controllo se e cosa devo outputtare
if (typeof argv.outres != 'undefined') {
    switch (argv.outres) {
        case 'json':
            out_res = 'json';
            break;
        case 'filename':
            out_res = 'filename';
            break;
        default:
            out_res = false;
    }
}


var query = get_query_from_file(query_file);

if (!out_res) {
    console.log(notice('Executing\n---\n' + query + '\n---\n'));
    console.log(notice('Saving it in ' + out_file))
}

query_overpass(query, function (error, data) {
    if (error) throw error;
    fs.openSync(out_file, 'w');
    fs.writeFileSync(out_file, JSON.stringify(data, null, 2), 'utf8');
    if (!out_res) {
        console.log(notice('Saved in ' + out_file));
    } else {
        switch (out_res) {
            case 'json':
                console.log(JSON.stringify(data, null, 0));
                break;
            case 'filename':
                console.log(out_file);
                break;
        }
    }
    process.exit();
});


function get_query_file_name(argument) {
    return sprintf("./%s/%s.%s", 'data-mining', argument.split("-").join(path.sep), 'ml');
}

function get_out_file_name(argument) {
    return sprintf("./%s/%s-%s.%s", 'retrieved-data', argument.split("-").join("_"), Date.now, 'geojson');
}

function get_query_from_file(filename) {
    return fs.readFileSync(filename, 'utf8');
}