export const getQualificationLabel = qualification => {
  switch (qualification) {
    case 'RECOMMENDED':
      return 'Recommended';
    case 'ACCEPTED':
      return 'Accepted';
    case 'REJECTED':
      return 'Rejected';
  }
};

export const getQualificationColor = qualification => {
  switch (qualification) {
    case 'RECOMMENDED':
      return 'green';
    case 'ACCEPTED':
      return 'orange';
    case 'REJECTED':
      return 'red';
  }
};
