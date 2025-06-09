import chroma from 'chroma-js';
import { useContext } from 'react';
import { getSecondaryColor } from './theme-generator';
import { ThemeConfigContext } from './ThemeConfigProvider';
import { ThemeContext } from './ThemeProvider';
import SectionHead from './SectionHead';

const SecondaryColorTypeSelector = () => {
  const { primaryColor, secondaryColorType, setSecondaryColorType } = useContext(ThemeConfigContext);
  const { themes, theme } = useContext(ThemeContext);

  const secondaryColorTypes = [{
    value: 'analogous',
    name: 'Analogous'
  },{
    value: 'complimentary',
    name: 'Complimentary'
  },{
    value: 'split-compliment-left',
    name: 'Split Compliment Left'
  },{
    value: 'split-compliment-right',
    name: 'Split Compliment Right'
  }]

  return (
    <div className="mb-4">
      <SectionHead text="Secondary color" />
      <div className="grid grid-cols-4 gap-2">
        {
          secondaryColorTypes.map((sct) => (
            <>
              <input 
                className="mr-2 hidden"
                type="radio" 
                key={sct.value}
                id={sct.value} 
                name="secondary-color-type" 
                value={sct.value}
                checked={sct.value === secondaryColorType}
                onChange={e => setSecondaryColorType(e.target.value as any)} />
              <label 
                className="w-full text-center p-1 rounded-lg cursor-pointer text-sm"
                htmlFor={sct.value}
                title={sct.name}
                style={{
                  color: sct.value === secondaryColorType ? themes[theme].textOnPalette.textBaseOnPrimary : themes[theme].text.base,
                  background: themes[theme].background.z1,
                  boxShadow: `0 0 0 2px ${sct.value === secondaryColorType ? themes[theme].paletteHover.primary : themes[theme].background.z1}`
                }}>
                <div
                  className="w-full h-9 rounded"
                  style={{
                    background: getSecondaryColor(chroma(primaryColor), sct.value as any),
                  }} />
                {/* {sct.name} */}
              </label>
            </>
          ))
        }
      </div>
    </div>
  );
};

export default SecondaryColorTypeSelector;