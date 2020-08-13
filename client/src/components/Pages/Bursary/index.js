import React from 'react';
import * as T from '../../Common/Typography';
import { Col, Row } from '../../Common/Grid';
import FAQ from '../../Common/FAQ';

const Bursary = () => (
  <div>
    <T.H2 color="blue" mb={8}>
      Bursary
    </T.H2>
    <T.H3C color="pink" mb={3}>
      How does it work?
    </T.H3C>

    <T.PXL bold color="blue" mb={3}>
      The PressPad bursary is funded directly from our corporate donors, grants
      and any revenue PressPad can generate by delivering training or
      consultancy work. As per our commitment to social impact, we also donate
      15% of all profits we receive from our hosting platform to our bursary
      impact fund.
    </T.PXL>
    <T.P color="gray3" mb={7}>
      Our bursary awards cover 50% or 100% of the cost of your placement, with
      the maximum bursary in real money terms capped at £840. We ask candidates
      questions to establish if they may be eligible for a bursary award so we
      can identify those who lack socio-economic privilege and are the most in
      need of our support, which includes our widening participation* work.
      Candidates may apply for multiple awards in any given year and PressPad
      will assess each application independently.
    </T.P>

    <T.H3C color="pink" mb={6}>
      FAQS
    </T.H3C>
    <Row inner>
      <Col w={[4, 12, 6]}>
        <FAQ
          title="How do we decide who gets a PressPad Bursary?"
          content={
            <>
              <T.PBold color="blue">
                We have a points system in place so the allocation of bursaries
                is fair and unbiased. Each candidate will be awarded a score
                upon completion of their bursary application.
              </T.PBold>
              <Row inner mt={4}>
                <Col w={[4, 4, 4]}>
                  <T.H6C color="pink">100% Bursary</T.H6C>
                </Col>
                <Col w={[4, 8, 8]}>
                  <T.P color="gray3">
                    700+ points required = accommodation costs covered up to the
                    value of £840.
                  </T.P>
                </Col>
              </Row>
              <Row inner mt={4}>
                <Col w={[4, 4, 4]}>
                  <T.H6C color="pink">50% Bursary</T.H6C>
                </Col>
                <Col w={[4, 8, 8]}>
                  <T.P color="gray3">
                    500-700 points = accommodation costs covered up to the value
                    of £420.
                  </T.P>
                </Col>
              </Row>
            </>
          }
        />
      </Col>
      <Col w={[4, 12, 6]}>
        <FAQ
          title="What if I don’t fulfill YOUR criteria but am still in need?"
          content={
            <T.P color="gray3">
              When a candidate completes our bursary application and scores less
              than 500 points they will not be eligible for a bursary award.
              However, we will always take into account unique circumstances
              that require further review and welcome candidates to appeal
              should they feel a decision is unfair.
            </T.P>
          }
        />
      </Col>

      <Col w={[4, 12, 6]}>
        <FAQ
          title="If I get awarded a bursary, what happens next? Are there any extra obligations I have?"
          content={
            <T.P color="gray3">
              We could ask you to write a blog about your experience, join our
              alumni community and fill out our before and after surveys (and
              preferably follow-up surveys) so we can assess the bursary’s
              impact.
            </T.P>
          }
        />
      </Col>
      <Col w={[4, 12, 6]}>
        <FAQ
          title="How much is awarded as part of a bursary?"
          content={
            <>
              <Row inner mt={4}>
                <Col w={[4, 4, 4]}>
                  <T.H6C color="pink">100% Bursary</T.H6C>
                </Col>
                <Col w={[4, 8, 8]}>
                  <T.P color="gray3">
                    700+ points required = accommodation costs covered up to the
                    value of £840.
                  </T.P>
                </Col>
              </Row>
              <Row inner mt={4}>
                <Col w={[4, 4, 4]}>
                  <T.H6C color="pink">50% Bursary</T.H6C>
                </Col>
                <Col w={[4, 8, 8]}>
                  <T.P color="gray3">
                    500-700 points = accommodation costs covered up to the value
                    of £420.
                  </T.P>
                </Col>
              </Row>
            </>
          }
        />
      </Col>

      <Col w={[4, 12, 6]}>
        <FAQ
          title="Are there other ways of funding my hosting with PressPad?"
          content={
            <T.P color="gray3">
              Media companies can also purchase credit to support their interns
              by subsidising the cost of accommodation. Please contact the
              company to find out if credit is available.{' '}
            </T.P>
          }
        />
      </Col>

      <Col w={[4, 12, 6]}>
        <FAQ
          title="How do we fund our bursaries?"
          content={
            <T.P color="gray3">
              PressPad has a mission lock written into our governing document
              that states that at least 10% of our income goes to the PressPad
              bursary scheme so that everyone can access and use our service.
            </T.P>
          }
        />
      </Col>

      <Col w={[4, 12, 6]}>
        <FAQ
          title="Can I get a bursary from PressPad for travel and other living expenses?"
          content={
            <>
              <T.P color="gray3">
                <T.PBold as="span" color="blue">
                  London Bursary Allowance:
                </T.PBold>{' '}
                The PressPad London Bursary allowance provides an additional 20%
                of the bursary award (capped at £168) if a candidate is living
                and working within Zones 1-4 of the London area. Candidates may
                be eligible for this if they have met the requirements of a 100%
                bursary award and will live and work in the London area for the
                duration of their internship.
              </T.P>
              <T.P color="gray3" mt={3}>
                <T.PBold as="span" color="blue">
                  Travel Expenses:{' '}
                </T.PBold>
                We’re working hard to secure extra funding to help cover the
                cost of travel to and from your PressPad accommodation and
                placement, however, we are currently not able to provide
                financial support for these expenses right now. Always ask if
                your work experience or internship includes expenses or not. If
                in doubt check the government guidance (HYPERLINK:
                https://www.gov.uk/guidance/national-minimum-wage-work-experience-and-internships#arrangements-which-dont-qualify-for-the-minimum-wage).
                Hint: The examples at the bottom of the page are the most useful
                we’ve found!
              </T.P>
            </>
          }
        />
      </Col>
      <Col w={[4, 12, 6]}>
        <FAQ
          title="*What does Widening Participation mean?"
          content={
            <>
              <T.P color="blue" mt={4}>
                Diversity and Inclusion are firmly embedded into how PressPad is
                run. We want to help remove any barriers that underrepresented
                communities face when pursuing a career in journalism. To
                achieve this, we allocate at least 20% of our bursary impact
                fund towards widening participation.
              </T.P>
              <T.P color="blue" mt={4}>
                Widening participation is where we specifically reach out to
                groups who are from underrepresented backgrounds e.g. young
                carers, people with a disability or those with an ethnic
                background that have barriers to entering the media industry.
              </T.P>
              <T.P color="blue" mt={4}>
                Our primary objective is, and will always be, to help those from
                low socio-economic groups with the necessary financial support
                to pursue a career in the media. But we also understand that
                disadvantage, prejudice and identity are complex and
                intersectional - and for that reason we committed to grow our
                widening participation fund as the organisation grows and gains
                more support.
              </T.P>
              <T.P color="blue" mt={4}>
                We feel passionate about firmly embedding these principles into
                our outreach to help close the access gap so that everyone
                regardless of income, race, religion or gender can follow an
                exciting and enriching path in journalism.
              </T.P>
            </>
          }
        />
      </Col>
    </Row>
  </div>
);

export default Bursary;
