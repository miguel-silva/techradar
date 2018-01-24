var env = process.env.BABEL_ENV || process.env.NODE_ENV;

var config = {
  presets: ["flow"],
  plugins: ["transform-class-properties", "transform-object-rest-spread"],
};

if (env === "test") {
  config.presets.push("env");
} else {
  config.presets.push([
    "env",
    {
      modules: false,
    },
  ]);
}

module.exports = config;
