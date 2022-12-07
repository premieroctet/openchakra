TEXT="""{    "user": {
        "type": "Schema.Types.ObjectId",
        "ref": "users"
    },
      "monday": {
          "event": [{
              "begin": {
                  "type": "String"
              },
              "end": {
                  "type": "String"
              },
              "services": [{
                  "label": {
                      "type": "String"
                  },
                  "value": {
                    "type": "Schema.Types.ObjectId",
                    "ref": "service"
                  }
              }],
              "all_services": {
                  "type": "Boolean",
                  "default": "false"
              }
          }]
      },
      "tuesday": {
            "event": [{
                "begin": {
                    "type": "String"
                },
                "end": {
                    "type": "String"
                },
                "services": [{
                    "label": {
                        "type": "String"
                    },
                    "value": {
                        "type": "Schema.Types.ObjectId",
                        "ref": "service"
                    }
                }],
                "all_services": {
                    "type": "Boolean",
                    "default": "false"
                }
            }]
      },
      "wednesday": {
            "event": [{
                "begin": {
                    "type": "String"
                },
                "end": {
                    "type": "String"
                },
                "services": [{
                    "label": {
                        "type": "String"
                    },
                    "value": {
                        "type": "Schema.Types.ObjectId",
                        "ref": "service"
                    }
                }],
                "all_services": {
                    "type": "Boolean",
                    "default": "false"
                }
            }]
      },
      "thursday": {
            "event": [{
                "begin": {
                    "type": "String"
                },
                "end": {
                    "type": "String"
                },
                "services": [{
                    "label": {
                        "type": "String"
                    },
                    "value": {
                        "type": "Schema.Types.ObjectId",
                        "ref": "service"
                    }
                }],
                "all_services": {
                    "type": "Boolean",
                    "default": "false"
                }
            }]
      },
      "friday": {
            "event": [{
                "begin": {
                    "type": "String"
                },
                "end": {
                    "type": "String"
                },
                "services": [{
                    "label": {
                        "type": "String"
                    },
                    "value": {
                        "type": "Schema.Types.ObjectId",
                        "ref": "service"
                    }
                }],
                "all_services": {
                    "type": "Boolean",
                    "default": "false"
                }
            }]
      },
      "saturday": {
            "event": [{
                "begin": {
                    "type": "String"
                },
                "end": {
                    "type": "String"
                },
                "services": [{
                    "label": {
                        "type": "String"
                    },
                    "value": {
                        "type": "Schema.Types.ObjectId",
                        "ref": "service"
                    }
                }],
                "all_services": {
                    "type": "Boolean",
                    "default": "false"
                }
            }]
      },
      "sunday": {
            "event": [{
                "begin": {
                    "type": "String"
                },
                "end": {
                    "type": "String"
                },
                "services": [{
                    "label": {
                        "type": "String"
                    },
                    "value": {
                        "type": "Schema.Types.ObjectId",
                        "ref": "service"
                    }
                }],
                "all_services": {
                    "type": "Boolean",
                    "default": "false"
                }
            }]
      },
    "period": {
        "active": {
            "type": "Boolean",
            "default": "false"
        },
        "month_begin": {
            "type": "Date"
        },
        "month_end": {
            "type": "Date"
        }
    }
}
"""

import json
import unittest


class JSONTest(unittest.TestCase):
    def test_loads(self):
        json.loads(TEXT)


if __name__ == '__main__':
    unittest.main()
