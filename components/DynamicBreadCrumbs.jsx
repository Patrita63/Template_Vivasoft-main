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

  // Custom logic to check for registereduser pages
  const isRegisteredUserPage = pathnames.includes("allregisteredusers");
  const isRegisteredUserDetailsPage = pathnames.includes("registereduserdetails");
  const isViewRegisteredUserDetailsPage = pathnames.includes("viewregistereduserdetails");
  const isDeleteRegisteredUserPage = pathnames.includes("deleteregistereduser");

  // Custom logic to check for agendacorsi pages
  const isAgendaCorsiPage = pathnames.includes("agendacorsi");
  const isAddAgendaCorsiPage = pathnames.includes("agendacorsiadd");
  const isEditAgendaCorsiPage = pathnames.includes("agendacorsieditdetails");
  const isViewAgendaCorsiPage = pathnames.includes("agendacorsiviewdetails");
  const isDeleteAgendaCorsiPage = pathnames.includes("agendacorsidelete");

  // Custom logic to check for catalogocorsi pages
  const isCatalogoCorsiPage = pathnames.includes("catalogocorsi");
  const isAddCatalogoCorsiPage = pathnames.includes("catalogocorsiadd");
  const isEditCatalogoCorsiPage = pathnames.includes("catalogocorsieditdetails");
  const isViewCatalogoCorsiPage = pathnames.includes("catalogocorsiviewdetails");
  const isDeleteCatalogoCorsiPage = pathnames.includes("catalogocorsidelete");

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

  const renderRegisteredUserBreadcrumb = (type, id) => {
    return (
      <Typography color="text.primary">
        <Link href="/intranet/allregisteredusers" passHref>
          All Registered Users
        </Link>
        {" "}
        / {type} Register User Details ({id || "N/A"})
      </Typography>
    );
  };

  const renderAgendaCorsiBreadcrumb = (type, id) => {
    return (
      <Typography color="text.primary">
        <Link href="/intranet/agendacorsi" passHref>
          Agenda Corsi Vivasoft
        </Link>
        {" "}
        / {type} Agenda Corsi ({id || "N/A"})
      </Typography>
    );
  };

  const renderCatalogoCorsiBreadcrumb = (type, id) => {
    return (
      <Typography color="text.primary">
        <Link href="/intranet/catalogocorsi" passHref>
          Catalogo Corsi Vivasoft
        </Link>
        {" "}
        / {type} Catalogo Corsi ({id || "N/A"})
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

      {/* Conditional "All Registered Users" page breadcrumb */}
      {isRegisteredUserPage && !isRegisteredUserDetailsPage && !isViewRegisteredUserDetailsPage && !isDeleteRegisteredUserPage && (
        <Typography color="text.primary">All Registered Users</Typography>
      )}

      {/* Conditional breadcrumbs for specific registered user pages */}
      {isRegisteredUserDetailsPage && renderRegisteredUserBreadcrumb("Edit", router.query.id)}
      {isViewRegisteredUserDetailsPage && renderRegisteredUserBreadcrumb("View", router.query.id)}
      {isDeleteRegisteredUserPage && renderRegisteredUserBreadcrumb("Delete", router.query.id)}

      {/* Conditional "Agenda Corsi Vivasoft" page breadcrumb */}
      {isAgendaCorsiPage && !isEditAgendaCorsiPage && !isViewAgendaCorsiPage && !isDeleteAgendaCorsiPage && (
        <Typography color="text.primary">Agenda Corsi Vivasoft</Typography>
      )}

      {/* Conditional breadcrumbs for specific agendacorsi pages */}
      {isAddAgendaCorsiPage && renderAgendaCorsiBreadcrumb("Add", router.query.id)}
      {isEditAgendaCorsiPage && renderAgendaCorsiBreadcrumb("Edit", router.query.id)}
      {isViewAgendaCorsiPage && renderAgendaCorsiBreadcrumb("View", router.query.id)}
      {isDeleteAgendaCorsiPage && renderAgendaCorsiBreadcrumb("Delete", router.query.id)}

      {/* Conditional "Catalogo Corsi Vivasoft" page breadcrumb */}
      {isCatalogoCorsiPage && !isEditCatalogoCorsiPage && !isViewCatalogoCorsiPage && !isDeleteCatalogoCorsiPage && (
        <Typography color="text.primary">Catalogo Corsi Vivasoft</Typography>
      )}

       {/* Conditional breadcrumbs for specific catalogocorsi pages */}
       {isAddCatalogoCorsiPage && renderCatalogoCorsiBreadcrumb("Add", router.query.id)}
      {isEditCatalogoCorsiPage && renderCatalogoCorsiBreadcrumb("Edit", router.query.id)}
      {isViewCatalogoCorsiPage && renderCatalogoCorsiBreadcrumb("View", router.query.id)}
      {isDeleteCatalogoCorsiPage && renderCatalogoCorsiBreadcrumb("Delete", router.query.id)}
    </Breadcrumbs>
  );
};

export default DynamicBreadCrumbs;
