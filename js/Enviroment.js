const Enviroment = {
    $frame: $("#frame"),
    playing: false,
    win: false,
    loose: false,
    blocks: [],
    enemies: [],
    grid: [],
    gravity: { x: 0, y: 0.15 },
    friction: {
        air: { x: 0.99, y: 0.99 },
        ground: { x: 0, y: -0.8 }
    },

    createLayout: function(n = 1) { // create the layout according to the passed parameter
        this.grid = this.layouts[n];
        this.enemies = this.enemyList[n];
        this.start();
        this.fillBlocks();
    },

    start: function() { // creating the divs of blocks in grid and assign classes to take their places
        $("div.block").remove();
        for (let row = 0; row <= 3; row++) {
            for (let column = 0; column <= 6; column++) {
                if (this.grid[row][column] == 1) {
                    this.$frame.append(
                        $("<div>", {
                            class: `block cell-${row + 1}${column + 1}`
                        })
                    );
                } else if (this.grid[row][column] == "s") {
                    $("#start")
                        .removeClass()
                        .addClass(`cell-${row + 1}${column + 1}`);
                } else if (this.grid[row][column] == "f") {
                    $("#finish")
                        .removeClass()
                        .addClass(`cell-${row + 1}${column + 1}`);
                }
            }
        }
    },

    fillBlocks: function() { // calculating blocks dimentions 
        this.blocks = [];
        const blocks = $(".block");
        blocks.each((index, block) => {
            this.blocks.push({
                id: index,
                top: $(block).position().top,
                left: $(block).position().left,
                width: $(block).width(),
                height: $(block).height()
            });
        });
    },
    
    layouts: {  // preset layout grid 0: no block , 1: block , f: finish point , s: starting point
        1: [
            [0, 0, 0, 0, 0, 0, "f"],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 1, 0],
            ["s", 0, 0, 1, 0, 0, 0]
        ],
        2: [
            [0, 0, 0, 1, 0, "f", 0],
            [0, 1, 0, 0, 0, 1, 0],
            ["s", 0, 0, 1, 0, 0, 0],
            [0, 1, 0, 0, 0, 1, 0]
        ],
        3: [
            [0, 0, 0, 1, 0, 1, "f"],
            ["s", 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0]
        ],
        4: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 1, 1, 0],
            [0, 1, 1, "f", 1, 1, 0],
            [0, "s", 0, 0, 0, 0, 0]
        ],
        5: [
            [0, 0, 1, 0, "f", 0, 0],
            [1, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 1],
            [0, "s", 0, 0, 1, 0, 0]
        ]
    },

    enemyList: { // preset enemy list corresponding to every layout
        1: [
            {
                id: "circular",
                height: 16,
                width: 20,
                column: 3,
                row: 1,
                blockSpan: 3
            },
            {
                id: "vertical",
                height: 16,
                width: 20,
                column: 4,
                row: 1,
                blockSpan: 3
            },
            {
                id: "horizontal",
                height: 16,
                width: 20,
                column: 1,
                row: 1,
                blockSpan: 3
            }
        ],
        2: [
            {
                id: "circular",
                height: 16,
                width: 20,
                column: 3,
                row: 1,
                blockSpan: 3
            },
            {
                id: "vertical",
                height: 16,
                width: 20,
                column: 5,
                row: 1,
                blockSpan: 5
            },
            {
                id: "horizontal",
                height: 16,
                width: 20,
                column: 1,
                row: 1,
                blockSpan: 3
            }
        ],
        3: [
            {
                id: "circular",
                height: 16,
                width: 20,
                column: 3,
                row: 2,
                blockSpan: 2
            },
            {
                id: "vertical",
                height: 16,
                width: 20,
                column: 3,
                row: 2,
                blockSpan: 3
            },
            {
                id: "horizontal",
                height: 16,
                width: 20,
                column: 1,
                row: 1,
                blockSpan: 5
            }
        ],
        4: [
            {
                id: "circular",
                height: 16,
                width: 20,
                column: 4,
                row: 1,
                blockSpan: 4
            },
            {
                id: "vertical",
                height: 16,
                width: 20,
                column: 7,
                row: 1,
                blockSpan: 4
            },
            {
                id: "horizontal",
                height: 16,
                width: 20,
                column: 1,
                row: 1,
                blockSpan: 7
            }
        ],
        5: [
            {
                id: "circular",
                height: 16,
                width: 20,
                column: 2,
                row: 2,
                blockSpan: 2
            },
            {
                id: "vertical",
                height: 16,
                width: 20,
                column: 4,
                row: 1,
                blockSpan: 3
            },
            {
                id: "horizontal",
                height: 16,
                width: 20,
                column: 1,
                row: 1,
                blockSpan: 2
            }
        ]
    }
};

export default Enviroment;
