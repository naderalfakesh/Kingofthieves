const Enviroment = {
    $frame: $("#frame"),
    gravity: { x: 0, y: 0.09 },
    friction: {
        air: { x: 0.99, y: 0.99 },
        ground: { x: 0, y: -0.75 }
    },
    grid: [
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0, 0, 0]
    ],
    blocks: [],
    start: function() {
        for (let row = 0; row <= 3; row++) {
            for (let column = 0; column <= 6; column++) {
                if (this.grid[row][column]) {
                    this.$frame.append(
                        $("<div>", {
                            class: `block cell-${row + 1}${column + 1}`
                        })
                    );
                }
            }
        }
    },
    fillBlocks: function() {
        const blocks = $(".block");
        blocks.each((index, block) => {
            this.blocks.push({
                id: index,
                top: $(block).position().top,
                left: $(block).position().left,
                width: $(block).width(),
                height: $(block).height(),
            })
        });
        console.log(this.blocks)
    }
};

export default Enviroment;
