import { Howl } from "howler";
import DefaultSound from "../images/checkout.wav";

const testSound = (path) => {
  const { Default, formattedPath } = checkDefault(path);
  const sound = new Howl({
    src: [formattedPath],
    volume: Default ? 3.0 : 1.0,
  });
  sound.play();
};

const checkout = (path) => {
  const { Default, formattedPath } = checkDefault(path);
  const sound = new Howl({
    src: [formattedPath],
    volume: Default ? 3.0 : 1.0,
  });
  sound.play();
};

const checkDefault = (path) => {
  if (path === "default") {
    return { Default: true, formattedPath: DefaultSound };
  }
  return { Default: false, formattedPath: `file://${path}` };
};

export { testSound, checkout };
