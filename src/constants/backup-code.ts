<CircularProgressbar
  value={66}
  text={`${NoAccountStep + 1}/4`}
  strokeWidth={15}
  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: "butt",

    // Text size
    textSize: "30px",

    // How long animation takes to go from one 66 to another, in seconds
    pathTransitionDuration: 0.5,

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `#CCD6EB`,
    textColor: "#003399",
    trailColor: "#003399",
    backgroundColor: "green",
  })}
/>;
