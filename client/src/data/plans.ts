import woodImg from "../images/wood.png";
import stoneImg from "../images/stone.png";
import ironImg from "../images/iron.png";
import goldImg from "../images/gold.png";
import diamondImg from "../images/diamond.png";
import netheriteImg from "../images/netherite.png";

export type Plan = {
  imageSrc: string;
  memory: number;
  plan: string;
  name: string;
}

export const plans: Plan[] = [
  {
    imageSrc: woodImg,
    memory: 1,
    plan: "plan_FM8EuuGF3C3pn3",
    name: "Wood",
  },
  {
    imageSrc: stoneImg,
    memory: 2,
    plan: "plan_FM8E73TqKTZIWV",
    name: "Stone",
  },
  {
    imageSrc: ironImg,
    memory: 3,
    plan: "plan_FM8EHhCrxNZGhd",
    name: "Iron",
  },
  {
    imageSrc: goldImg,
    memory: 4,
    name: "Gold",
    plan: "plan_FM8EvzJrRIYn5R",
  },
  {
    imageSrc: diamondImg,
    memory: 5,
    plan: "plan_FM8ExZxKgKh22g",
    name: "Diamond",
  },
  {
    imageSrc: netheriteImg,
    memory: 6,
    name: "Netherite",
    plan: "plan_FM8En4JVkWZ43y",
  },
];
