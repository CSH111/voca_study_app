import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(fas, far);

export const Spinner = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-circle-notch" spin {...props} />;
};

export const EllipsisIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-ellipsis" {...props} />;
};

export const AddIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-plus" {...props} />;
};

export const DeleteIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-trash-can" {...props} />;
};

export const EditIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-pen-to-square" {...props} />;
};

export const StarIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-star" {...props} />;
};

export const GoBackIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-arrow-rotate-left" {...props} />;
};

export const FolderIcon = (props) => {
  return <FontAwesomeIcon icon="fa-sharp fa-solid fa-folder" {...props} />;
};

export const BookMarkIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-book-bookmark" {...props} />;
};

export const CheckIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-check" {...props} />;
};

export const CancelIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-xmark" {...props} />;
};

export const StudyIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-book-open-reader" {...props} />;
};

export const LeftIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-angle-left" {...props} />;
};

export const RightIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-angle-right" {...props} />;
};

export const SoundIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-volume-high" {...props} />;
};

export const ShareIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-share-nodes" {...props} />;
};
export const BurgerIcon = (props) => {
  return <FontAwesomeIcon icon="fa-solid fa-bars" {...props} />;
};
