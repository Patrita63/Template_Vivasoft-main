import React from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";

const DynamicBreadCrumbs = () => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);

  // Custom logic to check for user pages
  const isUserPage = pathnames.includes("allusers");
  const isUserDetailsPage = pathnames.includes("userdetails");
  const isViewUserDetailsPage = pathnames.includes("viewuserdetails");
  const isDeleteUserPage = pathnames.includes("deleteuser");

  // Helper to create user-related breadcrumb
  const renderUserBreadcrumb = (type, id) => {
    return (
      <Typography color="text.primary">
        <Link href="/intranet/allusers" passHref>
          All Users
        </Link>
        {" "}
        / {type} User Details ({id || "N/A"})
      </Typography>
    );
  };

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ margin: "16px 0" }}>
      {/* Home and Intranet Links */}
      <Link href="/" passHref>
        Home web site
      </Link>
      <Link href="/intranet" target="_blank" passHref>
        Intranet Home
      </Link>

      {/* Conditional "All Users" page breadcrumb */}
      {isUserPage && !isUserDetailsPage && !isViewUserDetailsPage && !isDeleteUserPage && (
        <Typography color="text.primary">All Users</Typography>
      )}

      {/* Conditional breadcrumbs for specific user pages */}
      {isUserDetailsPage && renderUserBreadcrumb("Edit", router.query.id)}
      {isViewUserDetailsPage && renderUserBreadcrumb("View", router.query.id)}
      {isDeleteUserPage && renderUserBreadcrumb("Delete", router.query.id)}
    </Breadcrumbs>
  );
};

export default DynamicBreadCrumbs;
