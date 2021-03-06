'use strict';

var Caml_builtin_exceptions = require("../../lib/js/caml_builtin_exceptions");
var Bytes                   = require("../../lib/js/bytes");
var Mt                      = require("./mt");
var Block                   = require("../../lib/js/block");
var Ext_string              = require("./ext_string");
var $$String                = require("../../lib/js/string");
var List                    = require("../../lib/js/list");
var Caml_string             = require("../../lib/js/caml_string");

function ff(x) {
  var a;
  switch (x) {
    case "0" : 
    case "1" : 
    case "2" : 
        a = 3;
        break;
    case "3" : 
        a = 4;
        break;
    case "4" : 
        a = 6;
        break;
    case "7" : 
        a = 7;
        break;
    default:
      a = 8;
  }
  return a + 3 | 0;
}

function gg(x) {
  var a;
  if (x > 8 || x < 0) {
    a = 8;
  }
  else {
    switch (x) {
      case 0 : 
      case 1 : 
      case 2 : 
          a = 3;
          break;
      case 3 : 
          a = 4;
          break;
      case 4 : 
          a = 6;
          break;
      case 5 : 
      case 6 : 
      case 7 : 
          a = 8;
          break;
      case 8 : 
          a = 7;
          break;
      
    }
  }
  return a + 3 | 0;
}

function rev_split_by_char(c, s) {
  var _i = 0;
  var _l = /* [] */0;
  while(true) {
    var l = _l;
    var i = _i;
    try {
      var i$prime = $$String.index_from(s, i, c);
      var s$prime = $$String.sub(s, i, i$prime - i | 0);
      _l = s$prime === "" ? l : /* :: */[
          s$prime,
          l
        ];
      _i = i$prime + 1 | 0;
      continue ;
      
    }
    catch (exn){
      if (exn === Caml_builtin_exceptions.not_found) {
        return /* :: */[
                $$String.sub(s, i, s.length - i | 0),
                l
              ];
      }
      else {
        throw exn;
      }
    }
  };
}

function xsplit(delim, s) {
  var len = s.length;
  if (len !== 0) {
    var _l = /* [] */0;
    var _i = len;
    while(true) {
      var i = _i;
      var l = _l;
      if (i !== 0) {
        var exit = 0;
        var i$prime;
        try {
          i$prime = $$String.rindex_from(s, i - 1 | 0, delim);
          exit = 1;
        }
        catch (exn){
          if (exn === Caml_builtin_exceptions.not_found) {
            return /* :: */[
                    $$String.sub(s, 0, i),
                    l
                  ];
          }
          else {
            throw exn;
          }
        }
        if (exit === 1) {
          var l_000 = $$String.sub(s, i$prime + 1 | 0, (i - i$prime | 0) - 1 | 0);
          var l$1 = /* :: */[
            l_000,
            l
          ];
          var l$2 = i$prime ? l$1 : /* :: */[
              "",
              l$1
            ];
          _i = i$prime;
          _l = l$2;
          continue ;
          
        }
        
      }
      else {
        return l;
      }
    };
  }
  else {
    return /* [] */0;
  }
}

function string_of_chars(x) {
  return $$String.concat("", List.map(Caml_string.js_string_of_char, x));
}

Mt.from_pair_suites("string_test.ml", /* :: */[
      /* tuple */[
        "mutliple switch",
        function () {
          return /* Eq */Block.__(0, [
                    9,
                    ff("4")
                  ]);
        }
      ],
      /* :: */[
        /* tuple */[
          "int switch",
          function () {
            return /* Eq */Block.__(0, [
                      9,
                      gg(4)
                    ]);
          }
        ],
        /* :: */[
          /* tuple */[
            "escape_normal",
            function () {
              return /* Eq */Block.__(0, [
                        "haha",
                        $$String.escaped("haha")
                      ]);
            }
          ],
          /* :: */[
            /* tuple */[
              "escape_bytes",
              function () {
                return /* Eq */Block.__(0, [
                          Bytes.of_string("haha"),
                          Bytes.escaped(Bytes.of_string("haha"))
                        ]);
              }
            ],
            /* :: */[
              /* tuple */[
                "escape_quote",
                function () {
                  return /* Eq */Block.__(0, [
                            '\\"\\"',
                            $$String.escaped('""')
                          ]);
                }
              ],
              /* :: */[
                /* tuple */[
                  "rev_split_by_char",
                  function () {
                    return /* Eq */Block.__(0, [
                              /* :: */[
                                "",
                                /* :: */[
                                  "bbbb",
                                  /* :: */[
                                    "bbbb",
                                    /* [] */0
                                  ]
                                ]
                              ],
                              rev_split_by_char(/* "a" */97, "bbbbabbbba")
                            ]);
                  }
                ],
                /* :: */[
                  /* tuple */[
                    "xsplit",
                    function () {
                      return /* Eq */Block.__(0, [
                                /* :: */[
                                  "a",
                                  /* :: */[
                                    "b",
                                    /* :: */[
                                      "c",
                                      /* [] */0
                                    ]
                                  ]
                                ],
                                xsplit(/* "." */46, "a.b.c")
                              ]);
                    }
                  ],
                  /* :: */[
                    /* tuple */[
                      "split_empty",
                      function () {
                        return /* Eq */Block.__(0, [
                                  /* [] */0,
                                  Ext_string.split(/* None */0, "", /* "_" */95)
                                ]);
                      }
                    ],
                    /* :: */[
                      /* tuple */[
                        "split_empty2",
                        function () {
                          return /* Eq */Block.__(0, [
                                    /* :: */[
                                      "test_unsafe_obj_ffi_ppx.cmi",
                                      /* [] */0
                                    ],
                                    Ext_string.split(/* Some */[/* false */0], " test_unsafe_obj_ffi_ppx.cmi", /* " " */32)
                                  ]);
                        }
                      ],
                      /* :: */[
                        /* tuple */[
                          "rfind",
                          function () {
                            return /* Eq */Block.__(0, [
                                      7,
                                      Ext_string.rfind("__", "__index__js")
                                    ]);
                          }
                        ],
                        /* :: */[
                          /* tuple */[
                            "rfind_2",
                            function () {
                              return /* Eq */Block.__(0, [
                                        0,
                                        Ext_string.rfind("__", "__index_js")
                                      ]);
                            }
                          ],
                          /* :: */[
                            /* tuple */[
                              "rfind_3",
                              function () {
                                return /* Eq */Block.__(0, [
                                          -1,
                                          Ext_string.rfind("__", "_index_js")
                                        ]);
                              }
                            ],
                            /* :: */[
                              /* tuple */[
                                "find",
                                function () {
                                  return /* Eq */Block.__(0, [
                                            0,
                                            Ext_string.find(/* None */0, "__", "__index__js")
                                          ]);
                                }
                              ],
                              /* :: */[
                                /* tuple */[
                                  "find_2",
                                  function () {
                                    return /* Eq */Block.__(0, [
                                              6,
                                              Ext_string.find(/* None */0, "__", "_index__js")
                                            ]);
                                  }
                                ],
                                /* :: */[
                                  /* tuple */[
                                    "find_3",
                                    function () {
                                      return /* Eq */Block.__(0, [
                                                -1,
                                                Ext_string.find(/* None */0, "__", "_index_js")
                                              ]);
                                    }
                                  ],
                                  /* :: */[
                                    /* tuple */[
                                      "of_char",
                                      function () {
                                        return /* Eq */Block.__(0, [
                                                  "0",
                                                  Caml_string.bytes_to_string(Bytes.make(1, /* "0" */48))
                                                ]);
                                      }
                                    ],
                                    /* :: */[
                                      /* tuple */[
                                        "of_chars",
                                        function () {
                                          return /* Eq */Block.__(0, [
                                                    string_of_chars(/* :: */[
                                                          /* "0" */48,
                                                          /* :: */[
                                                            /* "1" */49,
                                                            /* :: */[
                                                              /* "2" */50,
                                                              /* [] */0
                                                            ]
                                                          ]
                                                        ]),
                                                    "012"
                                                  ]);
                                        }
                                      ],
                                      /* [] */0
                                    ]
                                  ]
                                ]
                              ]
                            ]
                          ]
                        ]
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]
        ]
      ]
    ]);

exports.ff                = ff;
exports.gg                = gg;
exports.rev_split_by_char = rev_split_by_char;
exports.xsplit            = xsplit;
exports.string_of_chars   = string_of_chars;
/*  Not a pure module */
