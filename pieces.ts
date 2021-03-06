export default {
  "75": {
    "type": "rectangle",
    "dimensions": [6, 2],
    "rooms": {
      "corridor": {
        "instances": {
          "Stairs": {
            "exits": [[0, 1], [6, 1]],
            "number": 6
          }
        }
      }
    }
  },
  "125": {
    "type": "octagon",
    "dimensions": [6, 6],
    "rooms": {
      "corridor": {
        "instances": {
          "Foyer": {
            "exits": [[0, 3], [6, 3], [3, 6]]
          }
        }
      }
    }
  },
  "150-H": {
    "type": "rectangle",
    "dimensions": [12, 2],
    "rooms": {
      "corridor": {
        "instances": {
          "Hallway": {
            "exits": [[1, 0], [3, 0], [5, 0], [7, 0], [9, 0], [11, 0], [0, 1],
                      [12, 1], [1, 2], [3, 2], [5, 2], [7, 2], [9, 2], [11, 2]],
            "number": 9,
            "flip": "Downstairs Hallway"
          }
        }
      }
    }
  },
  "150": {
    "type": "circle",
    "dimensions": [6, 6],
    "rooms": {
      "activity": {
        "points": 3,
        "touches_modifier": -1,
        "instances": {
          "Piano Room": {
            "combo": ["living", "sleep"],
            "exits": [[3, 0], [6, 3], [3, 6]]
          },
          "Berchta Room": {
            "combo": ["living", "sleep"],
            "exits": [[0, 3], [3, 6], [6, 3]]
          },
          "Flute Room": {
            "combo": ["living", "sleep"],
            "exits": [[3, 0], [6, 3], [0, 3]]
          }
        }
      },
      "downstairs": {
        "points": 3,
        "all_modifier": 1,
        "instances": {
          "Bottomless Pit": {
            "combo": ["outdoor"],
            "exits": [[3, 0]]
          },
          "Fungus Room": {
            "combo": ["food"],
            "exits": [[3, 0], [0, 3]]
          },
          "The Hole": {
            "combo": ["sleep"],
            "exits": [[3, 6]]
          }
        }
      },
      "living": {
        "points": 4,
        "modifier": 1,
        "instances": {
          "Study": {
            "combo": ["living"],
            "exits": [[3, 0], [3, 6], [0, 3], [6, 3]]
          },
          "Sitting Room": {
            "combo": ["outdoor"],
            "exits": [[3, 0], [3, 6], [0, 3], [6, 3]]
          },
          "Parlor": {
            "combo": ["activity"],
            "exits": [[3, 0], [3, 6], [0, 3], [6, 3]]
          }
        }
      }
    }
  },
  "100": {
    "type": "rectangle",
    "dimensions": [4, 4],
    "rooms": {
      "food": {
        "points": 2,
        "instances": {
          "Pantry": {
            "exits": [[0, 3], [4, 1]]
          },
          "Larder": {
            "exits": [[0, 3], [4, 3]]
          },
          "Buttery": {
            "exits": [[0, 1], [4, 3]]
          }
        }
      },
      "utility": {
        "points": 1,
        "instances": {
          "Powder Room": {
            "exits": [[3, 4]]
          },
          "Broom Closet": {
            "exits": [[1, 4]]
          },
          "Cloak Room": {
            "exits": [[1, 4]]
          }
        }
      },
      "living": {
        "points": 5,
        "instances": {
          "Pink Cabinet": {
            "exits": [[0, 1], [3, 0], [4, 1], [3, 4]]
          },
          "Focus Room": {
            "exits": [[0, 1], [3, 0], [4, 3], [3, 4]]
          },
          "Lilac Cabinet": {
            "exits": [[0, 1], [1, 0], [4, 3], [3, 4]]
          }
        }
      }
    }
  },
  "200": {
    "type": "rectangle",
    "dimensions": [8, 4],
    "rooms": {
      "utility": {
        "points": 2,
        "instances": {
          "Washroom": {
            "exits": [[5, 4]]
          },
          "Dirt Room": {
            "exits": [[8, 1]]
          },
          "Utility Room": {
            "exits": [[8, 3]]
          }
        }
      },
      "food": {
        "points": 1,
        "modifier": 3,
        "instances": {
          "Anteroom": {
            "combo": ["sleep"],
            "exits": [[3, 0], [5, 4]]
          },
          "Food Prep Room": {
            "combo": ["activity"],
            "exits": [[7, 0], [7, 4]]
          },
          "Meat Locker": {
            "combo": ["outdoor"],
            "exits": [[0, 1], [8, 1]]
          }
        }
      },
      "sleep": {
        "points": 2,
        "modifier": 2,
        "instances": {
          "Nap Room": {
            "combo": ["living"],
            "exits": [[8, 3], [3, 4]]
          },
          "Dressing Room": {
            "combo": ["food"],
            "exits": [[8, 1], [0, 3]]
          },
          "Solar": {
            "combo": ["outdoor"],
            "exits": [[8, 3], [7, 4]]
          }
        }
      }
    }
  },
  "250": {
    "type": "rectangle",
    "dimensions": [10, 4],
    "rooms": {
      "outdoor": {
        "points": 1,
        "modifier": 1,
        "instances": {
          "Porch": {
            "combo": ["sleep"],
            "exits": [[1, 4], [9, 4]],
            "fence": true
          },
          "Gatehouse": {
            "combo": ["outdoor"],
            "exits": [[1, 4], [9, 4]],
            "fence": true
          },
          "Shed": {
            "combo": ["utility"],
            "exits": [[1, 4], [10, 3]],
            "fence": true
          }
        }
      },
      "downstairs": {
        "points": 2,
        "all_modifier": 2,
        "instances": {
          "Mold Room": {
            "combo": ["food"],
            "exits": [[0, 3], [5, 4]]
          },
          "Knight Room": {
            "combo": ["sleep"],
            "exits": [[0, 3], [9, 4]]
          },
          "Crypt": {
            "all_modifier": 1,
            "combo": ["living"],
            "exits": [[0, 3], [9, 4]]
          }
        }
      },
      "activity": {
        "points": 4,
        "touches_modifier": -1,
        "instances": {
          "Billiards Room": {
            "combo": ["food", "living", "sleep"],
            "exits": [[5, 0], [10, 1], [3, 4]]
          },
          "Oratory": {
            "combo": ["sleep", "living", "downstairs"],
            "exits": [[5, 0], [10, 1], [10, 3]]
          },
          "Sewing Room": {
            "combo": ["living", "utility", "sleep"],
            "exits": [[7, 0], [10, 3], [7, 4]]
          }
        }
      }
    }
  },
  "300": {
    "type": "L",
    "dimensions": [8, 8],
    "rooms": {
      "utility": {
        "points": 3,
        "instances": {
          "Sauna": {
            "exits": [[8, 7]]
          },
          "Panic Room": {
            "exits": [[4, 1]]
          },
          "Laundry Room": {
            "exits": [[8, 5]]
          }
        }
      },
      "food": {
        "points": 1,
        "modifier": 3,
        "instances": {
          "Scullery": {
            "combo": ["utility"],
            "exits": [[8, 5], [0, 7]]
          },
          "Dining Room": {
            "combo": ["living"],
            "exits": [[0, 3], [8, 5]]
          },
          "Kitchen": {
            "combo": ["food"],
            "exits": [[4, 3], [3, 8]]
          }
        }
      },
      "sleep": {
        "points": 3,
        "modifier": 2,
        "instances": {
          "Queen's Bedroom": {
            "combo": ["sleep"],
            "exits": [[1, 0], [4, 1]]
          },
          "Guest Bedroom": {
            "combo": ["food"],
            "exits": [[8, 7], [3, 8]]
          },
          "Tasso Room": {
            "combo": ["living"],
            "exits": [[0, 1], [7, 8]]
          }
        }
      }
    }
  },
  "350": {
    "type": "rectangle",
    "dimensions": [14, 4],
    "rooms": {
      "living": {
        "points": 3,
        "modifier": 2,
        "instances": {
          "Salon": {
            "combo": ["activity"],
            "exits": [[11, 0], [0, 3], [14, 3], [9, 4]]
          },
          "Gallery of Mirrors": {
            "combo": ["corridor"],
            "exits": [[13, 0], [0, 3], [14, 3], [1, 4]]
          }
        }
      },
      "corridor": {
        "points": 1,
        "modifier": 1,
        "instances": {
          "Great Hall": {
            "combo": ["utility"],
            "exits": [[3, 0], [7, 0], [11, 0], [0, 1], [14, 1], [0, 3],
                      [14, 3], [1, 4], [5, 4], [9, 4], [13, 4]]
          },
          "Upper Hall": {
            "combo": ["food"],
            "exits": [[3, 0], [7, 0], [11, 0], [0, 1], [14, 1], [0, 3],
                      [14, 3], [1, 4], [5, 4], [9, 4], [13, 4]]
          }
        }
      },
      "activity": {
        "points": 5,
        "touches_modifier": -1,
        "instances": {
          "Train Room": {
            "combo": ["corridor", "living", "sleep", "downstairs"],
            "exits": [[11, 0], [14, 3], [11, 4]]
          },
          "9 Pin Alley": {
            "combo": ["sleep", "living", "food", "utility"],
            "exits": [[1, 0], [0, 1], [1, 4]]
          }
        }
      }
    }
  },
  "400": {
    "type": "rectangle",
    "dimensions": [8, 8],
    "rooms": {
      "living": {
        "points": 3,
        "modifier": 2,
        "instances": {
          "East Tapestry Chamber": {
            "combo": ["activity", "outdoor"],
            "exits": [[5, 0], [0, 3], [8, 3], [7, 8]]
          },
          "Observatory": {
            "combo": ["activity", "living"],
            "exits": [[3, 0], [8, 3], [0, 5], [5, 8]]
          }
        }
      },
      "outdoor": {
        "points": 2,
        "modifier": 1,
        "instances": {
          "French Gazebo": {
            "combo": ["activity"],
            "exits": [[0, 5], [8, 7], [3, 8]]
          },
          "Pumpkin Garden": {
            "combo": ["outdoor"],
            "exits": [[8, 1], [0, 3], [7, 8]]
          }
        }
      },
      "sleep": {
        "points": 4,
        "modifier": 2,
        "instances": {
          "Grand Bedchamber": {
            "combo": ["corridor"],
            "exits": [[0, 1], [7, 8]]
          },
          "Servant's Quarters": {
            "combo": ["corridor"],
            "exits": [[0, 5], [3, 8]]
          }
        }
      }
    }
  },
  "450": {
    "type": "rectangle",
    "dimensions": [12, 6],
    "rooms": {
      "living": {
        "points": 2,
        "modifier": 3,
        "instances": {
          "Drawing Room": {
            "combo": ["activity", "utility"],
            "exits": [[5, 0], [12, 1], [0, 3], [11, 6]]
          },
          "West Tapestry Room": {
            "combo": ["activity", "outdoor"],
            "exits": [[11, 0], [0, 3], [12, 3], [1, 6]]
          }
        }
      },
      "outdoor": {
        "points": 3,
        "modifier": 1,
        "instances": {
          "Formal Gardens": {
            "combo": ["living"],
            "exits": [[12, 1], [12, 5], [9, 6]]
          },
          "Coach House": {
            "combo": ["food"],
            "exits": [[12, 1], [9, 6]]
          }
        }
      },
      "downstairs": {
        "points": 1,
        "all_modifier": 2,
        "instances": {
          "Armory": {
            "combo": ["activity"],
            "exits": [[12, 3], [9, 6]]
          },
          "Dungeon": {
            "combo": ["downstairs"],
            "exits": [[12, 5], [5, 6]]
          }
        }
      }
    }
  },
  "500": {
    "type": "circle",
    "dimensions": [10, 10],
    "rooms": {
      "activity": {
        "points": 6,
        "touches_modifier": -2,
        "instances": {
          "Forum": {
            "combo": ["food", "downstairs", "living", "sleep"],
            "exits": [[5, 0], [10, 5], [5, 10]]
          },
          "Theater": {
            "combo": ["utility", "corridor", "living", "sleep"],
            "exits": [[5, 0], [0, 5], [10, 5]]
          }
        }
      },
      "outdoor": {
        "points": 4,
        "modifier": 1,
        "instances": {
          "Hunding's Hut": {
            "combo": ["outdoor"],
            "exits": [[0, 5], [10, 5], [5, 10]],
            "fence": true
          },
          "Green House": {
            "combo": ["living"],
            "exits": [[0, 5], [10, 5]],
            "fence": true
          }
        }
      },
      "downstairs": {
        "points": 1,
        "all_modifier": 2,
        "instances": {
          "Venus Grotto": {
            "all_modifier": 1,
            "combo": ["corridor"],
            "exits": [[0, 5], [10, 5]]
          },
          "Secret Lair": {
            "combo": ["utility"],
            "exits": [[0, 5], [5, 10]]
          }
        }
      }
    }
  },
  "600": {
    "type": "octagon",
    "dimensions": [14, 8],
    "rooms": {
      "living": {
        "points": 1,
        "modifier": 4,
        "instances": {
          "Vestibule": {
            "combo": ["food"],
            "exits": [[7, 0], [0, 5], [14, 5], [7, 8]]
          },
          "Throne Room": {
            "combo": ["sleep"],
            "exits": [[11, 0], [0, 3], [14, 5], [11, 8]]
          }
        }
      },
      "outdoor": {
        "points": 5,
        "modifier": 1,
        "instances": {
          "Terrace Gardens": {
            "combo": ["outdoor"],
            "exits": [[0, 3], [14, 3], [3, 8], [11, 8]],
            "fence": true
          },
          "Stables": {
            "combo": ["activity"],
            "exits": [[0, 3], [14, 3], [0, 5], [14, 5]],
            "fence": true
          }
        }
      },
      "activity": {
        "points": 7,
        "touches_modifier": -2,
        "instances": {
          "Singer's Chamber": {
            "combo": ["food", "downstairs", "utility", "corridor", "living", "sleep"],
            "exits": [[5, 8], [7, 8], [9, 8]]
          },
          "Audience Room": {
            "combo": ["food", "downstairs", "utility", "corridor", "living", "sleep"],
            "exits": [[5, 0], [14, 3], [14, 5]]
          }
        }
      }
    }
  }
};