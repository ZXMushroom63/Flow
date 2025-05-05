addNode("parabola_coefficients", {
    alias: ["Find Parabola Coefficients"],
    inputs: ["x₁", "y₁", "x₂", "y₂", "x₃", "y₃"],
    outputs: ["a", "b", "c"],
    func: (x1, y1, x2, y2, x3, y3) => {
        let denominator = (x1 - x2) * (x1 - x3) * (x2 - x3);

        let a = (x3 * (y2 - y1) + x2 * (y1 - y3) + x1 * (y3 - y2)) / denominator;
        let b = ((x3 ** 2) * (y1 - y2) + (x2 ** 2) * (y3 - y1) + (x1 ** 2) * (y2 - y3)) / denominator;
        let c = ((x1 ** 2) * (x2 * y3 - x3 * y2) + (x2 ** 2) * (x3 * y1 - x1 * y3) + (x3 ** 2) * (x1 * y2 - x2 * y1)) / denominator;

        return [a, b, c];
    },
    color: "black",
    doc: `Calculates the coefficient of a parabola that passes through the given points. Use the general form y=ax²+bx+c`,
});