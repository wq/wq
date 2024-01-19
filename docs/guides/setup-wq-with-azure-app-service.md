---
order: -1
icon: pin
---

How To: Set up wq with Azure App Service
========================================

The following steps should help you deploy a [wq-based container image][setup] as a production website via [Azure App Service][appservice].  The official [Azure Python + PostgreSQL tutorial][azure-tutorial] may also be useful as a reference.

> This guide assumes you already followed the steps to get a dev container running in [GitHub Codespaces][setup-codespaces] or [Docker Desktop][setup-docker].

 * [Create App Service and Database](#create-app-service-and-database)
 * [Update Database Settings](#update-database-settings)
 * [Create Container Registry](#create-container-registry)
 * [Connect GitHub Repository](#connect-github-repository)
 * [Configure App](#configure-app)
 * [Next Steps](#next-steps)

## Create App Service and Database

1. Log into <https://portal.azure.com> and select "Create a Resource".
![Azure - Portal Home - Create Resource](setup/azure-01-create-home.png)

2. Select "Web App" from the list of options.
![Azure - Create Resource](setup/azure-02-create-resource.png)

3. Complete the basic information form for the app.  You will likely want to create a new Resource Group to make it easier to manage and/or delete everything associated with this tutorial in the future.  Select "Docker Container" for the "Publish" type.
![Azure - Create Web App](setup/azure-03-create-web-app.png)

4. On the next screen, enable the database and select "PostgreSQL - Flexible Server".  The default names should be fine unless you want to change them.
![Azure - Create Database](setup/azure-04-create-database.png)

> Note that the auto-created database will start with 128 GB of storage, costing around $15/mo (not including compute costs).  If this is too large, leave the box unchecked and create a PostgreSQL database manually in a separate step.  (Unfortunately, Azure does not allow scaling database storage down once created.)  After creating the database separately, you'll need to manually connect the Web App and Database to the same VPC.

5. On the next screen, select "Single Container" and "Quickstart".  (We will connect the actual container [later](#connect-container-registry).)
![Azure - Initial Docker Settings](setup/azure-05-create-docker.png)

6. Accept the defaults for the remaining screens, then click Create.
![Azure - Create Results](setup/azure-06-create-done.png)

## Update Database Settings

7. Navigate to the PostgreSQL instance (e.g. try-wq-server) and select "Compute + storage".  Unless you anticipate a lot of traffic right away, switch to a "Burstable" "Standard_B1ms" instance.
![Azure - Database Compute](setup/azure-07-database-compute.png)

8. Navigate to the "Networking" section, ensure that the private DNS zone is enabled, and click "Save".
![Azure - Database Networking](setup/azure-08-database-networking.png)

9. Navigate to the "Server Parameters" section and search for "extensions".  Open the dropdown to ensure that `POSTGIS` is selected as an available extension, then click "Save".
![Azure - Database Extensions](setup/azure-09-database-extensions.png)

## Create Container Registry

> If you already have a container registry in Azure, you can skip to [Step 13](#connect-github-repository).

10. From the portal home screen, select "Container registries" -> "Create".
![Azure - Portal Home - Registry](setup/azure-10-registry-home.png)

11. Select the resource group you created in Step 3 and give the registry a name.  It could be similar to the app name, unless you are planning to reuse the same registry for other apps.
![Azure - Create Registry](setup/azure-11-registry-basics.png)

12. Once the registry is created, go to its properties, enable the "Admin user", and click "Save".
![Azure - Registry Settings](setup/azure-12-registry-admin.png)

## Connect Github Repository

> If you haven't already created a repository on GitHub, complete Steps 1-3 of the [GitHub Codespaces guide][setup-codespaces] before continuing to Step 13 below.

13. From the portal home screen, navigate to the "Web App" you created in Steps 1-6 of this guide and locate the "Deployment Center" section.  Change the "Source" to "GitHub Actions" and authenticate to link your GitHub account.  Select the organization, repository, and branch containing your application.
![Azure - App Deployment - Source](setup/azure-13-deployment-source.png)

> If you get a warning about basic auth not being enabled, go to "Configuration" -> "General Settings", ensure "Basic Auth Publishing Credentials" is on, and click Save, then return to the Deployment Center and complete Step 13 again.

14. Complete the remaining Deployment Center settings and click Save.  For "Registry" pick the registry name you entered in Step 11.  The "Image" name can be anything, but should correspond to the app (especially if you will be re-using the registry for other apps.)
![Azure - App Deployment - Registry](setup/azure-14-deployment-registry.png)

15. Go to the repository on GitHub and confirm that there is a new commit from Azure.  Click on the yellow indicator or navigate to the "Actions" tab.
![GitHub - Pending Action](setup/azure-15-deployment-pending.png)

16. Watch to see that both the "build" and "deploy" jobs complete successfully.
![GitHub - Complete Action](setup/azure-16-deployment-complete.png)

> You might be able to open the *.azurewebsites.net URL, but it will probably error out until the remaining settings are configured below.

## Configure App

17. Navigate to the "Configuration" section and add three new Application Settings: `DJANGO_SETTINGS_MODULE`, `DATABASE_URL`, and `SECRET_KEY`
![Azure - Environment Variable](setup/azure-17-app-settings.png)

Setting | Value
--|--
`DJANGO_SETTINGS_MODULE` | `"project.settings.prod"`
`SECRET_KEY` | Can be generated via `python -c "import secrets; print(secrets.token_urlsafe())"`
`DATABASE_URL` | Adapt from `AZURE_POSTGRESQL_CONNECTIONSTRING`

> For example, given the following value for `AZURE_POSTGRESQL_CONNECTIONSTRING`:
> ```
> Database=try-wq-database;Server=try-wq-server.postgres.database.azure.com;User Id=someuser;Password=$SOMEPASSWORD
> ```
> The `DATABASE_URL` would be:
> ```
> postgis://someuser:%24SOMEPASSWORD@try-wq-server.postgres.database.azure.com/try-wq-database
> ```
> Note that special characters in the password need to be URL-escaped.  One way to do this is with the following command:
> ```python
> python -c 'import urllib.parse;print(urllib.parse.quote("$SOME_PASSWORD"))'
> ```

18. Confirm that all three settings are defined and click "Save".
![Azure - App Configuration](setup/azure-18-app-configuration.png)

19. After waiting a few minutes for the configuration to take effect, navigate to the "SSH" section and click "Go"
![Azure - SSH tool](setup/azure-19-ssh-start.png)

20. Run the `migrate` and `createsuperuser` commands in the SSH console:
![Azure - Django Migrations](setup/azure-20-ssh-migrate.png)
```bash
/project/db/manage.py migrate
/project/db/manage.py createsuperuser
```

21. Open the *.azurewebsites.net URL and confirm that you are able to log in.
![App Login](setup/app-login.png)

## Next Steps

You now have a working wq production environment running in the cloud!  At this point you can take any of the following steps:

 * Update the [config] settings to override the site title and theme
 * Further customize your app's UI and behavior by registering [plugins]
 * Describe the rest of [your data model][model]

[setup]: ../overview/setup.md
[appservice]: https://azure.microsoft.com/products/app-service
[azure-tutorial]: https://learn.microsoft.com/en-us/azure/app-service/tutorial-python-postgresql-app?tabs=django
[setup-codespaces]: ./setup-wq-with-github-codespaces.md
[setup-docker]: ./setup-wq-with-docker-desktop.md
[config]: ../config.md
[plugins]: ../plugins/index.md
[model]: ./describe-your-data-model.md