const Organisation = require('../../models/Organisation');
const account = require('./accounts');

const reset = () => Organisation.deleteMany();

const createNew = async ({ name }) => {
  const newAccount = await account.createNew();

  const newOrganisation = {
    name,
    logo: {
      fileName: 'test.svg',
    },
    account: newAccount._id,
  };

  return Organisation.create(newOrganisation);
};

const createAll = async ({ accounts }) => {
  await reset();
  const { organisationAccount } = accounts;

  const organisations = [
    {
      name: 'Financial Times',
      logo: {
        fileName: 'test.svg',
      },
      account: organisationAccount._id,
      description:
        'The Financial Times is an international daily newspaper printed in broadsheet and published digitally that focuses on business and economic current affairs.',
      accountDetails: {
        firstName: 'Robert',
        lastName: 'Meyers',
        phone: '+44 7911 123245',
        email: 'robert.meyers@financial-times.com',
      },
      contactDetails: {
        firstName: 'Susanne',
        lastName: 'Leopoldski',
        phone: '+44 7911 636345',
        email: 'susanne.leopoldski@financial-times.com',
      },
      internshipOpportunities: [
        {
          key: 0,
          opportunity: 'Internship Schme A 2020',
          link: 'https://www.fa.com/internship-scheme-a-2020',
          details:
            'Opportunity for graduates to participate in a the upcoming internship scheme involving a diverse range of opportunities. Applications close September 14th 2020. Please send your applications including CV to susanne.leopoldski@financial-times.com.',
        },
        {
          key: 1,
          opportunity: 'Ongoing Creative Industry Scheme',
          link: 'https://www.fa.com/creative-industry-scheme',
          details:
            'Cultural and creative sectors are comprised of all sectors whose activities are based on cultural values, or other artistic individual or collective creative expressions and are defined in the legal basis of the Creative Europe Programme. Take part in this new programme focussing on supporting young talents in this thriving sector.',
        },
      ],
    },
  ];

  const [financialTimeOrganisation] = await Organisation.create(organisations);
  return { financialTimeOrganisation };
};

module.exports = {
  createAll,
  createNew,
  reset,
};
