import { Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  // ensure we compare numbers (useful since useParams returns strings)
  const currpage = Number(page) || 1;

  // helper to build route targets consistently using numeric currpage
  const makeTo = (p) =>
    !isAdmin
      ? keyword
        ? `/search/${keyword}/page/${p}`
        : `/page/${p}`
      : `/admin/productlist/${p}`;

  const navigate = useNavigate();

  const handleNavigate = (to, e) => {
    // log and programmatically navigate as a fallback if Link is swallowed
    // eslint-disable-next-line no-console
    console.log('Paginate navigate', to);
    try {
      navigate(to);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Navigate failed', err);
    }
  };

  return (
    pages > 1 && (
      <Pagination>
        {currpage > 1 && (
          <Pagination.Prev
            as={Link}
            to={makeTo(currpage - 1)}
            onClick={(e) => handleNavigate(makeTo(currpage - 1), e)}
          />
        )}

        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            as={Link}
            key={x + 1}
            to={makeTo(x + 1)}
            active={x + 1 === currpage}
            onClick={(e) => handleNavigate(makeTo(x + 1), e)}
          >
            {x + 1}
          </Pagination.Item>
        ))}

        {currpage < pages && (
          <Pagination.Next
            as={Link}
            to={makeTo(currpage + 1)}
            onClick={(e) => handleNavigate(makeTo(currpage + 1), e)}
          />
        )}
      </Pagination>
    )
  );
};

export default Paginate;
