.. dropdown:: Orchestration Steps
    :class-container: howtodrop

        .. code-block:: xml

            <OrchestrationSteps>

                <OrchestrationStep Order="1" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-CollectEmail" TechnicalProfileReferenceId="SelfAsserted-CollectEmail" />
                </ClaimsExchanges>
                </OrchestrationStep>
                <OrchestrationStep Order="2" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-VerifyEmail" TechnicalProfileReferenceId="VerifyEmail" />
                </ClaimsExchanges>
                </OrchestrationStep>
                <OrchestrationStep Order="3" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-CollectPhone" TechnicalProfileReferenceId="SelfAsserted-CollectPhone" />
                </ClaimsExchanges>
                </OrchestrationStep>
                <OrchestrationStep Order="4" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-VerifyPhone" TechnicalProfileReferenceId="VerifyPhone" />
                </ClaimsExchanges>
                </OrchestrationStep>
                <OrchestrationStep Order="5" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-CollectSSN" TechnicalProfileReferenceId="SelfAsserted-CollectSSN" />
                </ClaimsExchanges>
                </OrchestrationStep>

                <OrchestrationStep Order="6" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-verificationSelection" TechnicalProfileReferenceId="SelfAsserted-verificationSelection" />
                </ClaimsExchanges>
                </OrchestrationStep>

                <OrchestrationStep Order="7" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-mDLVerificationAnnexD" TechnicalProfileReferenceId="SelfAsserted-mDLVerificationAnnexD" />
                </ClaimsExchanges>
                </OrchestrationStep>
                    <OrchestrationStep Order="8" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-ReviewMdlClaims" TechnicalProfileReferenceId="SelfAsserted-ReviewMdlClaims" />
                </ClaimsExchanges>
                </OrchestrationStep>

                    <OrchestrationStep Order="9" Type="ClaimsExchange">
                <ClaimsExchanges>
                    <ClaimsExchange Id="SelfAsserted-ApprovalStatus" TechnicalProfileReferenceId="SelfAsserted-ApprovalStatus" />
                </ClaimsExchanges>
                </OrchestrationStep>

                <OrchestrationStep Order="10" Type="SendClaims" CpimIssuerTechnicalProfileReferenceId="JwtIssuer" />
        
            </OrchestrationSteps>