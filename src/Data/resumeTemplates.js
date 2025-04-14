import professional1 from "../Components/ResumeTempletes/professional1";
import Simple1 from "../Components/ResumeTempletes/simple1";
import MainResume from "../Screens/MainResume";

export default {
  1: {
    name: 'Simple 1',
    component: Simple1,
  },
  2: {
    name: 'Simple 2',
    component: MainResume, // you can add new components later
  },
  3: {
    name: 'Professional 1',
    component: professional1,
  },
  4: {
    name: 'Premium 1',
    component: MainResume,
  },
};
