import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface ProductItem {
  title: string;
  subtitle?: string;
  visualTag: string;
  themeClass: string;
  imageSrc?: string;
  imageAlt?: string;
  intro: string[];
  featureHeading?: string;
  features?: string[];
  applicationsHeading?: string;
  applications?: string[];
  packSize?: string;
}

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent {
  readonly products: ProductItem[] = [
    {
      title: 'Car Engine Oil',
      subtitle: 'Multigrade 20W-40 | API CI-4',
      visualTag: 'Fleet Grade',
      themeClass: 'theme-silver',
      imageSrc: 'assets/images/synthx-car-engine-oil-product.png',
      imageAlt: 'Synthx car engine oil product pack',
      intro: [
        'MULTIGRADE, high-quality universal fleet engine oil designed for use in off-highway diesel equipment, farm machinery, marine engines, mixed commercial fleets, car and light trucks with either diesel or gasoline engines.'
      ],
      featureHeading: 'Product Features',
      features: [
        'Excellent soot control for protection against soot-induced oil thickening.',
        'Resists viscosity and thermal breakdown at high temperature.',
        'Protects against sludge and varnish formation.',
        'Good resistance to foaming and aeration meets the requirement of API service CI-4.'
      ]
    },
    {
      title: 'Steering Oil',
      subtitle: 'TQ Type - A',
      visualTag: 'Drive Control',
      themeClass: 'theme-blue',
      imageSrc: 'assets/images/synthx-steering-oil-product.png',
      imageAlt: 'Synthx steering oil product pack',
      intro: [
        'TQ transmission Oil is has low coefficient of friction to meet general requirements. This is blended with high quality solvent refined base stocks and selection of special additives.'
      ],
      featureHeading: 'Product Features & Application Benefit',
      features: [
        'Excellent load carrying capacity.',
        'Improve life of transmission & steering system.',
        'Excellent shear stability.',
        'Compatible with various types of seal materials.',
        'Reduce gear wear.',
        'Good anti foam, corrosion & oxidation stability.'
      ],
      applicationsHeading: 'Applications',
      applications: [
        'Recommended for lubrication of automatic and power steering units of automobiles and light truck engines requiring TYPE-A Suffix A fluid and also for syndromison gears.'
      ]
    },
    {
      title: 'Chain Oil - High Temperature, Synthetic',
      visualTag: 'Industrial Heat',
      themeClass: 'theme-copper',
      imageSrc: 'assets/images/synthx-chain-oil-product.png',
      imageAlt: 'Synthx chain oil product spray can',
      intro: [
        'Synthx CHAIN OIL is a synthetic, high temperature chain oil designed specifically for lubrication of hot chains for conveyor systems, food processing, plastic film stretching, fiber board manufacturing and ceramics ensuring reliable operation even at high temperature and stress.'
      ],
      applicationsHeading: 'Applications',
      applications: [
        'Synthx Speed CHAIN OIL is designed specifically for lubrication of hot conveyor chains in drying ovens, roller chains, chains or clips with ball bearings, slide chains with lubrication of slide rails, chain joints and bolts, dryers, steamers and similar severe applications.'
      ],
      featureHeading: 'Product Features & Benefits',
      features: [
        'Extends bearing, chain and conveyor life.',
        'Thermal stability.',
        'Outstanding penetration properties for rapid formation of lubricant film.',
        'Excellent lubrication even at high operating temperatures.',
        'Resistance to wear and pressure.',
        'Low volatility below 250°C.',
        'Good regeneration effect on used oil.'
      ]
    },
    {
      title: 'CNG',
      visualTag: 'Clean Fuel',
      themeClass: 'theme-gold',
      imageSrc: 'assets/images/synthx-cng-product.png',
      imageAlt: 'Synthx CNG engine oil product pack',
      intro: [
        'Synthx CNG oil consists a blend of synthetic and premium conventional base oils with seal conditioning agents, extra cleaning agents, additional anti-wear additives and novel friction modifiers for added protection.',
        'It provides performance benefits for high mileage, new and re-built engines.'
      ],
      featureHeading: 'Advantages',
      features: [
        'Conditions engine seals.',
        'Minimizes oil consumption.',
        'Maximizes power output.',
        'Resists thermal breakdown.',
        'Features Dispersive Polymer Technology (DPT) for superior soot control.',
        'Maximizes engine durability.',
        'Wide temperature performance.'
      ]
    },
    {
      title: 'Engine Oil',
      visualTag: 'Heavy Duty',
      themeClass: 'theme-steel',
      imageSrc: 'assets/images/synthx-engine-oil-product.png',
      imageAlt: 'Synthx industrial lubricant product drum',
      intro: [
        'Synthx Engine Oil consists a blend of synthetic and premium conventional base oils with seal conditioning agents, extra cleaning agents, additional anti-wear additives and novel friction modifiers for added protection.',
        'It provides performance benefits for high mileage, new and re-built engines.'
      ],
      featureHeading: 'Advantages',
      features: [
        'Conditions engine seals.',
        'Minimizes oil consumption.',
        'Maximizes power output.',
        'Resists thermal breakdown.',
        'Features Dispersive Polymer Technology (DPT) for superior soot control.',
        'Maximizes engine durability.',
        'Wide temperature performance.'
      ]
    },
    {
      title: 'Gear Oil',
      visualTag: 'Transmission Strength',
      themeClass: 'theme-indigo',
      imageSrc: 'assets/images/synthx-gear-oil-product.png',
      imageAlt: 'Synthx gear oil product pack',
      intro: [
        'Synthx Gear oil is high-performance gear oil that has excellent performance and load carrying ability, as well as providing rust and corrosion protection to transmission components.',
        'This grade not only has outstanding low-temperature fluidity, eliminating cold start gear selection problems but can also cope with highly stressed gearboxes running at high temperatures.'
      ],
      featureHeading: 'Advantages',
      features: [
        'Thermal protection provides outstanding thermal stability for cleanliness and longer service life.',
        'Wear protection contains additives to assist in protecting gear teeth against pitting, spalling, and scouring.',
        'Reduces chattering with special additives in limited-slip differentials.',
        'Corrosion protection protects parts from rust and corrosion.'
      ]
    },
    {
      title: 'Grease',
      visualTag: 'Bearing Care',
      themeClass: 'theme-ember',
      imageSrc: 'assets/images/synthx-grease-product.png',
      imageAlt: 'Synthx premium multipurpose grease product pack',
      intro: [
        'Synthx EP and NLGI3 are high performance multi-purpose lithium based grease, suitable for a wide range of industrial and automotive application.'
      ],
      featureHeading: 'Product Features',
      features: [
        'It is engineered to provide a long service life in a broad range of applications.',
        'EP lithium grease are fortified with multifunctional olymer, rust and corrosion inhibitors to give protection for a wide range of applications and service conditions.',
        'These products also have a good oxidation resistance.'
      ],
      applicationsHeading: 'Applications',
      applications: [
        'These are recommended for industrial machineries, rolling element bearings in steel mills, quarry, marine, agricultural, mining, construction machinery, drilling, conveyors, elevators, chains, pulleys, cranes, shafts, automotive applications where water and temperature resistance up to 1800°C is required.',
        'EP is highly recommended for applications where high loads are applied.'
      ]
    },
    {
      title: 'Hydraulic Oil',
      visualTag: 'System Efficiency',
      themeClass: 'theme-teal',
      imageSrc: 'assets/images/synthx-hydraulic-oil-product.png',
      imageAlt: 'Synthx hydraulic oil product drum',
      intro: [
        'Synthx Hydraulic Oil is designed for use in all kind of hydraulic systems running under the most severe conditions, such as machine tools, mould injection machines, presses and other industrial or mobile equipment.',
        'It is also used in many other applications, where a universal high performance anti wear lubricant is the first choice such as low charged gears, sliding roller bearings, air compressors, servo motors and control systems equipped with fine filtration systems.'
      ],
      featureHeading: 'Advantages',
      features: [
        'High viscosity index.',
        'Excellent shear stability.',
        'Superior thermal stability avoiding the formation of sludge even at high temperature.',
        'Very good oxidation stability ensuring a long service life of the fluid.',
        'High protection against wear ensuring maximum equipment life.',
        'Excellent hydrolytic stability avoiding filter blocking.',
        'Excellent protection against rust and corrosion.',
        'Low pour point.',
        'Good demulsibility ensuring rapid water separation.'
      ]
    },
    {
      title: 'Automatic Transmission Fluid (ATF)',
      visualTag: 'Smooth Shift',
      themeClass: 'theme-violet',
      imageSrc: 'assets/images/synthx-atf-product.png',
      imageAlt: 'Synthx automatic transmission fluid product pack',
      intro: [
        'High performance, multipurpose automatic transmission fluid (ATF) formulated in hydrocracked base oil which provides outstanding oxidation resistance.',
        'It is specially engineered for passenger car automatic transmissions which require Dexron III performance level.'
      ],
      featureHeading: 'Advantages',
      features: [
        'Smooth operation through a combination of advanced friction modifiers and high viscosity index fluid for smooth, fuel-efficient gear shifting and shudder-free torque transfer.',
        'Maximizes transmission life for transmissions which feature slip-controlled torque converter lock-up with precisely balanced friction modifiers to prevent stick-slip vibration that leads to shudder.',
        'Extended oil service life through hydrocracked base oils and advanced performance additives that provide exceptional thermal stability and oxidation resistance which prevents oil degradation and deposit formation.'
      ]
    },
    {
      title: '4T 20W-40 API SN JASO MA-2',
      visualTag: 'Motorcycle Range',
      themeClass: 'theme-orange',
      imageSrc: 'assets/images/synthx-4t-product.png',
      imageAlt: 'Synthx lubricant product pack',
      intro: [
        'SYNTHX 4T 20W-40 API SN (Full-synthetic) is superior 4-stroke motorcycle engine oil with triple action protective molecules, which protects engine, clutch and gears.'
      ],
      featureHeading: 'Advantages',
      features: [
        'Increase engine power.',
        'Reduce engine wear.',
        'Enhanced engine protection.',
        'Ensure faster pick up.',
        'Resists viscosity and thermal breakdown at high temperature.'
      ],
      applicationsHeading: 'Applications',
      applications: [
        'Recommended for use in all type of 4-stroke motorcycle of Hero, Honda, TVS, Bajaj, Suzuki, Yamaha etc.',
        'Meets the requirements of API SN JASO MA-2 standard.'
      ],
      packSize: '900ml | 1Ltr. | 50Ltr. | 210Ltr.'
    }
  ];
}
