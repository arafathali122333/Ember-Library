import { helper } from '@ember/component/helper';

export default helper(function showorhide([positional] /*, named*/) {
  if (positional.borrowed.length === 0 && positional.returned.length === 0) {
    return '';
  }
  return positional.name;
});
