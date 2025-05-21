// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Culinary data directly in code
    const data = {
        "name": "Cuisine",
        "children": [
            {
                "name": "Africa",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 365 },
                            { "name": "water", "value": 241 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "garlic", "value": 334 }
                        ]
                    },
                    {
                        "name": "Meat",
                        "children": [
                            { "name": "chicken", "value": 234 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 461 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "cinnamon", "value": 209 },
                            { "name": "cumin", "value": 264 },
                            { "name": "pepper", "value": 351 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 341 },
                            { "name": "tomato", "value": 182 }
                        ]
                    }
                ]
            },
            {
                "name": "Australia & NZ",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 117 },
                            { "name": "sugar", "value": 152 },
                            { "name": "water", "value": 156 }
                        ]
                    },
                    {
                        "name": "Dairy",
                        "children": [
                            { "name": "butter", "value": 115 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "garlic", "value": 106 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 105 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "pepper", "value": 171 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 184 }
                        ]
                    }
                ]
            },
            {
                "name": "British Isles",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 276 },
                            { "name": "sugar", "value": 280 },
                            { "name": "water", "value": 165 }
                        ]
                    },
                    {
                        "name": "Dairy",
                        "children": [
                            { "name": "butter", "value": 268 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "garlic", "value": 156 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 157 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "pepper", "value": 247 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 263 }
                        ]
                    }
                ]
            },
            {
                "name": "China",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 435 },
                            { "name": "sugar", "value": 477 },
                            { "name": "water", "value": 392 },
                            { "name": "soy sauce", "value": 707 },
                            { "name": "vegetable oil", "value": 353 }
                        ]
                    },
                    {
                        "name": "Cereal",
                        "children": [
                            { "name": "cornstarch", "value": 314 }
                        ]
                    },
                    {
                        "name": "Meat",
                        "children": [
                            { "name": "chicken", "value": 373 }
                        ]
                    },
                    {
                        "name": "Nuts & Seed",
                        "children": [
                            { "name": "sesame", "value": 497 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "ginger", "value": 532 },
                            { "name": "pepper", "value": 521 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "garlic", "value": 526 }
                        ]
                    }
                ]
            },
            {
                "name": "France",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 314 },
                            { "name": "sugar", "value": 270 },
                            { "name": "water", "value": 210 }
                        ]
                    },
                    {
                        "name": "Dairy",
                        "children": [
                            { "name": "butter", "value": 277 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "garlic", "value": 206 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 228 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "pepper", "value": 236 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 232 }
                        ]
                    }
                ]
            },
            {
                "name": "India",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 1242 },
                            { "name": "sugar", "value": 1060 },
                            { "name": "water", "value": 1018 }
                        ]
                    },
                    {
                        "name": "Meat",
                        "children": [
                            { "name": "chicken", "value": 568 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "cumin", "value": 549 },
                            { "name": "garlic", "value": 540 },
                            { "name": "pepper", "value": 492 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 593 },
                            { "name": "tomato", "value": 444 }
                        ]
                    }
                ]
            },
            {
                "name": "Italy",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 623 },
                            { "name": "sugar", "value": 381 },
                            { "name": "water", "value": 363 }
                        ]
                    },
                    {
                        "name": "Dairy",
                        "children": [
                            { "name": "butter", "value": 289 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "garlic", "value": 373 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 349 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "pepper", "value": 362 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 331 }
                        ]
                    }
                ]
            },
            {
                "name": "Japan",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 214 },
                            { "name": "sugar", "value": 194 },
                            { "name": "water", "value": 170 }
                        ]
                    },
                    {
                        "name": "Meat",
                        "children": [
                            { "name": "chicken", "value": 149 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "garlic", "value": 129 },
                            { "name": "pepper", "value": 135 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 133 }
                        ]
                    }
                ]
            },
            {
                "name": "Korea",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 276 },
                            { "name": "sugar", "value": 272 },
                            { "name": "water", "value": 200 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "garlic", "value": 245 },
                            { "name": "pepper", "value": 210 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 227 }
                        ]
                    }
                ]
            },
            {
                "name": "Middle East",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 632 },
                            { "name": "sugar", "value": 237 },
                            { "name": "water", "value": 418 }
                        ]
                    },
                    {
                        "name": "Beverage",
                        "children": [
                            { "name": "lemon juice", "value": 326 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "parsley", "value": 294 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "cumin", "value": 264 },
                            { "name": "garlic", "value": 553 },
                            { "name": "pepper", "value": 521 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 623 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 420 }
                        ]
                    }
                ]
            },
            {
                "name": "USA",
                "children": [
                    {
                        "name": "Additive",
                        "children": [
                            { "name": "salt", "value": 8280 },
                            { "name": "sugar", "value": 7916 },
                            { "name": "water", "value": 3490 }
                        ]
                    },
                    {
                        "name": "Bakery",
                        "children": [
                            { "name": "flour", "value": 4047 }
                        ]
                    },
                    {
                        "name": "Dairy",
                        "children": [
                            { "name": "butter", "value": 6831 }
                        ]
                    },
                    {
                        "name": "Herb",
                        "children": [
                            { "name": "garlic", "value": 5235 }
                        ]
                    },
                    {
                        "name": "Meat",
                        "children": [
                            { "name": "egg", "value": 4748 }
                        ]
                    },
                    {
                        "name": "Plant",
                        "children": [
                            { "name": "olive", "value": 4668 }
                        ]
                    },
                    {
                        "name": "Spice",
                        "children": [
                            { "name": "pepper", "value": 7611 }
                        ]
                    },
                    {
                        "name": "Vegetable",
                        "children": [
                            { "name": "onion", "value": 5188 }
                        ]
                    }
                ]
            }
        ]
    };

    // Initialize the visualization
    createBubbleChart(data);
});