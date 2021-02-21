import { checkFish } from '../utils/ext';
import { ReactComponent as ImageFishNila} from './../assets/fish/img-fish-nila.svg';
import { ReactComponent as ImageFishCarp} from './../assets/fish/img-fish-carp.svg';
import { ReactComponent as ImageFishCatfish} from './../assets/fish/img-fish-catfish.svg';
import { ReactComponent as ImageFishDory} from './../assets/fish/img-fish-dory.svg';
import { ReactComponent as ImageShrimp} from './../assets/fish/img-shrimp.svg';

const FishImage = ({ name = null, emptyShowDefault = true, big = false }) => {
    // Variable
    let cls = "sh-fish-image";
    let defaultImage = <ImageFishNila />
    let image = defaultImage;
    const { isCarp, isCatFish, isDory, isShrimp } = checkFish( name );

    // Image Element
    if( isCarp ) {
        image = <ImageFishCarp />;
    }
    if( isCatFish ) {
        image = <ImageFishCatfish />;
    }
    if( isDory ) {
        image = <ImageFishDory />;
    }
    if( isShrimp ) {
        image = <ImageShrimp />;
    }

    // Class Name
    cls = big ? cls + " sh-fish-image__big" : cls;

    // Element
    return <div className={ cls }>
        <div className="sh-fish-image__item">
            { image }
        </div>
    </div>;
}

export default FishImage;