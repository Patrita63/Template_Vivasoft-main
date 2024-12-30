import React from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";

const DynamicBreadCrumbs = () => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);

  // Custom logic to handle combined "All Users / User Details"
  const isUserDetailsPage = pathnames.includes("userdetails");
  const isAllUsersPage = pathnames.includes("allusers");

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "16px 0" }}>
      {/* Home and Intranet Links */}
      <Link href="/" passHref>
        Home web site
      </Link>
      <Link href="/intranet" passHref>
        Intranet Home
      </Link>

      {/* Conditional "All Users / User Details" with All Users that go to allusers page */}
      {isAllUsersPage || isUserDetailsPage ? (
        isUserDetailsPage ? (
          <Typography color="text.primary">
            <Link href="/intranet/allusers" passHref>
              All Users
            </Link>{" "}
            / User Details ({router.query.id || "N/A"})
          </Typography>
        ) : (
          <Typography color="text.primary">All Users</Typography>
        )
      ) : null}
      {/* Conditional "All Users / User Details" */}
      {/* {isUserDetailsPage || isAllUsersPage ? (
        <Typography color="text.primary">
          {isAllUsersPage && !isUserDetailsPage && "All Users"}
          {isUserDetailsPage &&
            `All Users / User Details (${router.query.id || "N/A"})`}
        </Typography>
      ) : null} */}
    </Breadcrumbs>
  );
};

export default DynamicBreadCrumbs;
