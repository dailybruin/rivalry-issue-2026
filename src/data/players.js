import chesney from '../images/Players/chesney.png';
import dieffenbach from '../images/Players/dieffenbach.png';
import knight from '../images/Players/knight.png';
import morgan from '../images/Players/morgan.png';
import omosigho from '../images/Players/omosigho.png';
import riley from '../images/Players/riley.png';
import maiava from '../images/Players/maiava.png';
import miller from '../images/Players/miller.png';
import mosley from '../images/Players/mosley.png';
import wafle from '../images/Players/wafle.png';

export const teams = {
  ucla: { id: 'ucla', name: 'UCLA', mascot: 'Bruins' },
  usc: { id: 'usc', name: 'USC', mascot: 'Trojans' },
};

// Placeholder stats and report copy from the Figma, until the reports are written.
const placeholderStats = [
  { label: 'Class', value: '-' },
  { label: 'Ht / Wt', value: '-' },
  { label: 'Hometown', value: '-' },
  { label: 'Previous', value: '-' },
];

const placeholderReport = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(6).trim(),
];

const roster = [
  { id: 'bob-chesney', team: 'ucla', name: 'Bob Chesney', position: 'Head coach', image: chesney },
  { id: 'ty-dieffenbach', team: 'ucla', name: 'Ty Dieffenbach', position: 'Quarterback', number: 14, image: dieffenbach },
  { id: 'wayne-knight', team: 'ucla', name: 'Wayne Knight', position: 'Running back', number: 3, image: knight },
  { id: 'semaj-morgan', team: 'ucla', name: 'Semaj Morgan', position: 'Wide receiver', number: 4, image: morgan },
  { id: 'sammy-omosigho', team: 'ucla', name: 'Sammy Omosigho', position: 'Linebacker', number: 10, image: omosigho },
  { id: 'lincoln-riley', team: 'usc', name: 'Lincoln Riley', position: 'Head coach', image: riley },
  { id: 'jayden-maiava', team: 'usc', name: 'Jayden Maiava', position: 'Quarterback', number: 14, image: maiava },
  { id: 'king-miller', team: 'usc', name: 'King Miller', position: 'Running back', number: 30, image: miller },
  { id: 'trent-mosley', team: 'usc', name: 'Trent Mosley', position: 'Wide receiver', number: 4, image: mosley },
  { id: 'luke-wafle', team: 'usc', name: 'Luke Wafle', position: 'Defensive end', number: 94, image: wafle },
];

export const players = roster.map((player) => ({
  stats: placeholderStats,
  report: placeholderReport,
  ...player,
}));
