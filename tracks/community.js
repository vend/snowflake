import { Track } from "./Track";

export const COMMUNITY: Track = {
  displayName: "Community",
  category: "D",
  summary: "Help build the community internally.",
  description:
    "Live and champion the company values within the team and across the company. Contribute to make our environment a better, more enjoyable and supportive place for everyone.",
  milestones: [
    {
      summary: "Is available and active in the team and contribute positively to the company culture",
      signals: [
        "Treats colleagues and clients with respect",
        "Participates in team activities and events",
        "Joins and participates in internal groups or initiatives"
      ],
      examples: [
        "Joined and actively participated in the Frontend community group",
        "Brought a small gift back from vacation for the team",
        "Constantly celebrated the team achievements",
        "Participated meaningfully in the team meetings",
        "Paired up with other developers to help them learn or unblock a situation",
        "Wrote entertaining and informative incident review updates on Confluence"
      ]
    },
    {
      summary: "Steps up, takes concrete actions to promote a positive and inclusive culture",
      signals: [
        "Makes space for others to participate",
        "Collaborates with other engineers outside direct responsibilities",
        "Finds ways to ramp up and engage new hires quickly"
      ],
      examples: [
        "Created Fuck Yeah Fridays",
        "Made sure to engage/include the quieter members of the team in discussions",
        "Helped document the current project on Confluence",
        "Proposes and run a regular walking lunch event",
        "Created and leads a regular Yoga session in the office",
        "Helped onboarding and setup a new graduate in the team",
        "Regularly encouraged and celebrated my team mates achievement publicly"
      ]
    },
    {
      summary: "Contributes to improving team relatedness, and helps build a culture of lending support",
      signals: [
        "Takes on additional on-call shifts at short notice",
        "Pitches in to help other teams hit deadlines, without missing own deadlines",
        "Uses position to raise difficult issues on someone's behalf"
      ],
      examples: [
        "Handles on-call with little support while still contributing to projects",
        "Started and drove the diversity and ally skills training",
        "Stayed positive and improved team morale during period after layoffs",
        "Helped another team move forward with their work by sharing knowledge/pairing...",
        "Constantly enabled others as the specialist in Go",
        "Raised up and clearly communicated risks and impediments on behalf of another team member",
        "Helped improve the team culture by creating a team specific tradition"
      ]
    },
    {
      summary: "Exemplifies selflessness for the team without compromising responsibilities, and lifts everyone up",
      signals: [
        "Goes above and beyond on the Watch, selflessly serving the team",
        "Implements concrete programs to significantly improve team inclusion",
        "Takes on large amounts of tedious grunt work for the team without being asked"
      ],
      examples: [
        "Took on setting up tooling for the project the team is working on",
        "Refactored a multitude of legacy PHP issues",
        "Created an automated testing pipeline for the team project",
        "Acted as sole maintainer of Jenkins for years",
        "Created and applied a team onboarding programme for newcomers",
        "Ran training sessions on React for the entire team",
        "Improved our team development experience by introducing a static analyser tool",
        "Constantly shared credit and promoted individuals from the team"
      ]
    },
    {
      summary:
        "Lives the company values, guards positive culture, and helps define policies that support relatedness between teams",
      signals: [
        "Brings separate teams together to build relatedness",
        "Holds individuals, teams, and leadership accountable to Vend's values",
        "Sets the tone, policy, and goals around maintaining an inclusive company"
      ],
      examples: [
        "Organized summer BBQ for the whole engineering group",
        "Devised, delivered and acted on findings from an engagement survey",
        "Challenged and corrected exclusionary behaviour or policies",
        "Organised cross-team events to help mix and match people",
        "Set up a regular event for the whole office to share achievements, failures and learnings",
        "Created and led a cross-team engineer rotation and immersion programme"
      ]
    }
  ]
};
