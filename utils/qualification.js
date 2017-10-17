import { Qualification } from 'corp-check-core';

export const getQualificationLabel = qualification => {
  switch (qualification) {
    case Qualification.RECOMMENDED:
      return 'Recommended';
    case Qualification.ACCEPTED:
      return 'Accepted';
    case Qualification.REJECTED:
      return 'Rejected';
  }
};

export const getQualificationColor = qualification => {
  switch (qualification) {
    case Qualification.RECOMMENDED:
      return 'green';
    case Qualification.ACCEPTED:
      return 'orange';
    case Qualification.REJECTED:
      return 'red';
  }
};
