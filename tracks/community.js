import { Track } from "./Track";

export const COMMUNITY: Track = {
  displayName: "Community",
  category: "D",
  description: "Builds community internally, gives of themself to the team, and champions and extols company values",
  milestones: [
    {
      summary: "Is available and present on current teams, and works to contribute positively to company culture",
      signals: [
        "Participates in team activities and offsites",
        "Treats colleagues and clients with respect",
        "Joins groups or committees outside regular duties",
      ],
      examples: [
        "Joined and actively participated in the Frontend platform group",
        "Brought a small gift back from vacation for the team",
        "Wrote entertaining and informative incident review updates on Confluence",
      ],
    },
    {
      summary: "Steps up, builds connectedness, and takes concrete actions to promote an inclusive culture",
      signals: [
        "Makes space for others to participate",
        "Collaborates with other engineers outside direct responsibilities",
        "Finds ways to ramp up and engage new hires quickly",
      ],
      examples: ["Created Fuck Yeah Fridays", "Brought shy and introverted people into a dominant conversation", ""],
    },
    {
      summary: "Contributes to improving team relatedness, and helps build a culture of lending support",
      signals: [
        "Takes on additional on-call shifts at short notice",
        "Pitches in to help other teams hit deadlines, without missing own deadlines",
        "Uses position to raise difficult issues on someone's behalf",
      ],
      examples: [
        "Handles on-call with little support while still contributing to projects",
        "Started and drove the diversity and ally skills training",
        "Stayed positive and improved team morale during period after layoffs",
      ],
    },
    {
      summary: "Exemplifies selflessness for the team without compromising responsibilities, and lifts everyone up",
      signals: [
        "Goes above and beyond on the Watch, serving the team without complaint",
        "Implements concrete programs to signficantly improve team inclusivity",
        "Takes on large amounts of tedious grunt work for the team without being asked",
      ],
      examples: [
        "Devoted large amount of time to helping outside direct responsibilities",
        "Refactored a multitude of legacy PHP issues",
        "Acted as sole maintainer of Jenkins for years",
      ],
    },
    {
      summary:
        "Lives the company values, guards positive culture, and defines policies that support relatedness between teams",
      signals: [
        "Brings separate teams together to build relatedness",
        "Holds individuals, teams, and leadership accountable to Vend's values",
        "Sets the tone, policy, and goals around maintaining an inclusive company",
      ],
      examples: [
        "Organized summer BBQ for the whole engineering org",
        "Devised, delivered and acted on findings from a CultureAmp survey",
        "Challenged and corrected exclusionary behaviour or policies",
      ],
    },
  ],
};
