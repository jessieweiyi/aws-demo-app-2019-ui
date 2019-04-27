AWS_REGION=ap-southeast-2
ENVIRONMENT := dev

FOLDER_CF_TEMPLATES := $(PWD)/infra
FILE_CF_TEMPLATE := aws-env-ui.yml
STACK_NAME_ENV_UI := aws-demo-app-2019-ui-${ENVIRONMENT}

DEV_ROUTE53_HOSTEDZONE := jessieweiyi.com
DEV_DOMAIN_NAME := aws-demo-app-2019.dev.jessieweiyi.com
PROD_ROUTE53_HOSTEDZONE := jessieweiyi.com
PROD_DOMAIN_NAME := aws-demo-app-2019.jessieweiyi.com

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