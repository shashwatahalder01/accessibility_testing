

export const helpers = {

    violationFingerprints(accessibilityScanResults: any) {
        const violationFingerprints = accessibilityScanResults.violations.map((violation: { id: any; nodes: { target: any; }[]; }) => ({
            rule: violation.id,
            // These are CSS selectors which uniquely identify each element with a violation of the rule in question.
            targets: violation.nodes.map((node: { target: any; }) => node.target),
        }));
        return JSON.stringify(violationFingerprints, null, 2);
    }


}