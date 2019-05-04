AWS_REGION=ap-southeast-2
ENVIRONMENT := dev
PROJECT := aws-demo-app-2019-ui

FOLDER_CF_TEMPLATES := $(PWD)/infra
FILE_CF_TEMPLATE := aws-env-ui.yml
STACK_NAME_ENV_UI := aws-demo-app-2019-ui-${ENVIRONMENT}

DEV_ROUTE53_HOSTEDZONE := jessieweiyi.com
DEV_DOMAIN_NAME := aws-demo-app-2019.dev.jessieweiyi.com
PROD_ROUTE53_HOSTEDZONE := jessieweiyi.com
PROD_DOMAIN_NAME := aws-demo-app-2019.jessieweiyi.com

DIR_BUILD := build
VERSION := $(shell whoami)
BUILD_IMAGE := $(PROJECT):$(VERSION)

ifeq (dev, $(ENVIRONMENT))
	ROUTE53_HOSTEDZONE := $(DEV_ROUTE53_HOSTEDZONE)
	DOMAIN_NAME := $(DEV_DOMAIN_NAME)
endif

ifeq (prod, $(ENVIRONMENT))
	ROUTE53_HOSTEDZONE := $(PROD_ROUTE53_HOSTEDZONE)
	DOMAIN_NAME := $(PROD_DOMAIN_NAME)
endif

PROVISION_PARAMETERS = --stack-name ${STACK_NAME_ENV_UI} \
		--template-body file://${FOLDER_CF_TEMPLATES}/${FILE_CF_TEMPLATE} \
		--parameters ParameterKey=Environment,ParameterValue=$(ENVIRONMENT) \
		ParameterKey=Route53HostedZone,ParameterValue=$(ROUTE53_HOSTEDZONE) \
		ParameterKey=DomainName,ParameterValue=$(DOMAIN_NAME) \
		--capabilities CAPABILITY_NAMED_IAM \
		--region ${AWS_REGION}

.PHONY: create-env-ui
create-env-ui:
	aws cloudformation create-stack $(PROVISION_PARAMETERS)
	aws cloudformation wait stack-create-complete --stack-name $(STACK_NAME_ENV_UI)

.PHONY: update-env-ui
update-env-ui:
	aws cloudformation update-stack $(PROVISION_PARAMETERS)
	aws cloudformation wait stack-update-complete --stack-name $(STACK_NAME_ENV_UI)

.PHONY: build
build:
	@echo Building artifacts
	docker build --target build -t $(BUILD_IMAGE) .
	docker run --rm -t -v $(PWD)/$(DIR_BUILD):/opt/app/$(DIR_BUILD) $(BUILD_IMAGE)

.PHONY: run-integration-tests
run-integration-tests:
	@echo Running intergration tests
	@echo Intergrations tests to be implemented

.PHONY: deploy
deploy: 
	aws s3 sync . s3://$(DOMAIN_NAME)/" --exclude "/index.html" --exclude "/config/*" --exclude .DS_Store
	aws s3 cp ./config/config.$(ENVIRONMENT).js s3://$(DOMAIN_NAME)/config/config.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/x-javascript
	aws s3 cp ./index.html s3://$(DOMAIN_NAME)/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html
