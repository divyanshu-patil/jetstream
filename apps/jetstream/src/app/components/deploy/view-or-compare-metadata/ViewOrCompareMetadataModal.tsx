/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { logger } from '@jetstream/shared/client-logger';
import { useNonInitialEffect } from '@jetstream/shared/ui-utils';
import { FileExtAllTypes, ListMetadataResult, MapOf, SalesforceOrgUi } from '@jetstream/types';
import { AutoFullHeightContainer, FileDownloadModal, Modal, Spinner, TreeItems } from '@jetstream/ui';
import Editor, { DiffEditor, useMonaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { Fragment, FunctionComponent, useCallback, useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import { useViewOrCompareMetadata } from './useViewOrCompareMetadata';
import ViewOrCompareMetadataEditorSummary from './ViewOrCompareMetadataEditorSummary';
import ViewOrCompareMetadataModalFooter from './ViewOrCompareMetadataModalFooter';
import ViewOrCompareMetadataSidebar from './ViewOrCompareMetadataSidebar';
import { EditorType, FileItemMetadata, OrgType } from './viewOrCompareMetadataTypes';
import { generateExport, getEditorLanguage } from './viewOrCompareMetadataUtils';

export interface ViewOrCompareMetadataModalProps {
  sourceOrg: SalesforceOrgUi;
  selectedMetadata: MapOf<ListMetadataResult[]>;
  onClose: () => void;
}

export const ViewOrCompareMetadataModal: FunctionComponent<ViewOrCompareMetadataModalProps> = ({
  sourceOrg,
  selectedMetadata,
  onClose,
}) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const diffEditorRef = useRef<editor.IStandaloneDiffEditor>(null);
  const [targetOrg, setTargetOrg] = useState<SalesforceOrgUi>(null);

  const [activeFile, setActiveFile] = useState<TreeItems<FileItemMetadata | null>>(null);
  const [activeFileType, setActiveFileType] = useState<string>('xml');
  const [activeSourceContent, setActiveSourceContent] = useState<string>(null);
  const [activeTargetContent, setActiveTargetContent] = useState<string>(null);
  const [editorType, setEditorType] = useState<EditorType>('SOURCE');

  const [downloadFileModalConfig, setDownloadFileModalConfig] = useState<{
    open: boolean;
    org: SalesforceOrgUi;
    data: any;
    fileNameParts: string[];
    allowedTypes: FileExtAllTypes[];
  }>({
    open: false,
    org: null,
    data: null,
    fileNameParts: [],
    allowedTypes: [],
  });

  const {
    fetchMetadata,
    // SOURCE
    sourceLoading,
    // sourceStatus,
    sourceLastChecked,
    sourceResults,
    sourceResultFiles,
    sourceError,
    // TARGET
    targetLoading,
    // targetStatus,
    targetLastChecked,
    targetResults,
    targetResultFiles,
    targetError,
    files,
  } = useViewOrCompareMetadata({ selectedMetadata });
  const monaco = useMonaco();

  // fetch source metadata on load
  useEffect(() => {
    fetchMetadata(sourceOrg, 'SOURCE');
  }, []);

  const setActiveFileContent = useCallback(
    async (currentActiveFile: TreeItems<FileItemMetadata>) => {
      // TODO: can we cache previously used files to avoid async operation?
      if (currentActiveFile.meta?.source && sourceResults) {
        try {
          // setActiveSourceContent(await sourceResults.file(currentActiveFile.meta.filename).async('string'));
          setActiveSourceContent(currentActiveFile.meta.source.content || '');
          setActiveFileType(getEditorLanguage(currentActiveFile.meta.source));
        } catch (ex) {
          // failed
          logger.warn('[VIEW OR COMPARE][FILE LOAD ERROR][SOURCE]', ex);
        }
      }
      if (targetResults) {
        try {
          setActiveTargetContent(currentActiveFile.meta.target?.content || '');
        } catch (ex) {
          // failed
          logger.warn('[VIEW OR COMPARE][FILE LOAD ERROR][TARGET]', ex);
        }
      }
    },
    [sourceResults, targetResults]
  );

  useEffect(() => {
    if (activeFile) {
      setActiveFileContent(activeFile);
    }
  }, [activeFile, sourceResults, targetResults]);

  useEffect(() => {
    if (sourceResults && targetResults) {
      setEditorType('DIFF');
    } else if (sourceResults) {
      setEditorType('SOURCE');
    }
  }, [sourceResults, targetResults]);

  useNonInitialEffect(() => {
    if (editorType === 'SOURCE' && editorRef.current) {
      editorRef.current.revealPosition({ column: 0, lineNumber: 0 });
    }
  }, [editorType, activeSourceContent]);

  useNonInitialEffect(() => {
    if (editorType === 'TARGET' && editorRef.current) {
      editorRef.current.revealPosition({ column: 0, lineNumber: 0 });
    }
  }, [editorType, activeTargetContent]);

  function handleEditorMount(ed: editor.IStandaloneCodeEditor) {
    editorRef.current = ed;
  }
  function handleDiffEditorMount(ed: editor.IStandaloneDiffEditor) {
    diffEditorRef.current = ed;
    // navigate to first difference
    ed.onDidUpdateDiff(() => {
      const diff = ed.getLineChanges();
      if (diff.length) {
        ed.revealLineInCenter(diff[0].originalStartLineNumber);
      } else {
        ed.revealPosition({ column: 0, lineNumber: 0 });
      }
    });
  }

  function handleTargetOrg(org: SalesforceOrgUi) {
    setTargetOrg(org);
    fetchMetadata(org, 'TARGET');
  }

  async function handleDownload(which: OrgType) {
    const fileNameParts = ['metadata-package'];
    if (which === 'SOURCE' && sourceResults) {
      setDownloadFileModalConfig({
        open: true,
        org: sourceOrg,
        data: await sourceResults.generateAsync({ type: 'arraybuffer', compressionOptions: { level: 5 } }),
        fileNameParts,
        allowedTypes: ['zip'],
      });
    } else if (targetResults) {
      setDownloadFileModalConfig({
        open: true,
        org: targetOrg,
        data: await targetResults.generateAsync({ type: 'arraybuffer', compressionOptions: { level: 5 } }),
        fileNameParts,
        allowedTypes: ['zip'],
      });
    }
  }

  function handleExport() {
    if (targetOrg && sourceResultFiles && targetResultFiles) {
      const exportData = generateExport(sourceResultFiles, targetResultFiles);
      setDownloadFileModalConfig({
        open: true,
        org: sourceOrg,
        data: exportData,
        fileNameParts: ['compare', targetOrg.label, 'with'],
        allowedTypes: ['xlsx', 'csv', 'json'],
      });
    }
  }

  function handleFileDownloadModalClose() {
    setDownloadFileModalConfig({
      open: false,
      org: null,
      data: null,
      fileNameParts: [],
      allowedTypes: [],
    });
  }

  return (
    <Fragment>
      {downloadFileModalConfig.open && (
        <FileDownloadModal
          org={downloadFileModalConfig.org}
          modalHeader="Export Automation"
          modalTagline="Exported data will reflect what is in Salesforce, not unsaved changes"
          data={downloadFileModalConfig.data}
          fileNameParts={downloadFileModalConfig.fileNameParts}
          allowedTypes={downloadFileModalConfig.allowedTypes}
          onModalClose={handleFileDownloadModalClose}
        />
      )}
      {!downloadFileModalConfig.open && (
        <Modal
          header="View or Compare Metadata"
          footer={
            <ViewOrCompareMetadataModalFooter
              hasSourceMetadata={!!sourceResults}
              hasTargetMetadata={!!targetResults}
              hasTargetMetadataContent={targetResultFiles?.length > 1}
              sourceLoading={sourceLoading}
              sourceLastChecked={sourceLastChecked}
              targetLoading={targetLoading}
              targetLastChecked={targetLastChecked}
              onDownloadPackage={handleDownload}
              onExportSummary={handleExport}
              onClose={onClose}
            />
          }
          size="lg"
          onClose={onClose}
        >
          <div
            className="slds-is-relative"
            css={css`
              margin: -0.75rem -0.25rem;
            `}
          >
            <AutoFullHeightContainer fillHeight bottomBuffer={165} setHeightAttr delayForSecondTopCalc className="slds-scrollable_none">
              <Split
                sizes={[20, 80]}
                minSize={[100, 300]}
                css={css`
                  display: flex;
                  flex-direction: row;
                  height: 100%;
                `}
              >
                <div
                  css={css`
                    overflow: auto;
                  `}
                >
                  <ViewOrCompareMetadataSidebar
                    editorType={editorType}
                    files={files}
                    targetOrg={targetOrg}
                    targetLoading={targetLoading}
                    hasSourceResults={!!sourceResults}
                    hasTargetResults={!!targetResults}
                    sourceError={sourceError}
                    targetError={targetError}
                    onEditorTypeChange={setEditorType}
                    onSelectedFile={setActiveFile}
                    onTargetOrgChange={handleTargetOrg}
                  />
                </div>
                <div
                  css={css`
                    height: 95%;
                  `}
                >
                  <div className="slds-text-heading_small slds-align_absolute-center">{activeFile?.meta?.source?.fullName}</div>
                  <ViewOrCompareMetadataEditorSummary
                    activeFile={activeFile}
                    sourceOrg={sourceOrg}
                    targetOrg={targetOrg}
                    editorType={editorType}
                  />

                  <div
                    css={css`
                      height: 95%;
                    `}
                  >
                    {sourceLoading && <Spinner />}
                    {editorType !== 'DIFF' && (
                      <Editor
                        height="100%"
                        theme="vs-dark"
                        language={activeFileType}
                        options={{
                          readOnly: true,
                          contextmenu: false,
                        }}
                        value={editorType === 'SOURCE' ? activeSourceContent || '' : activeTargetContent || ''}
                        onMount={handleEditorMount}
                      />
                    )}
                    {editorType === 'DIFF' && (
                      <DiffEditor
                        height="100%"
                        theme="vs-dark"
                        language={activeFileType}
                        options={{
                          readOnly: true,
                          contextmenu: false,
                        }}
                        original={activeSourceContent || ''}
                        modified={activeTargetContent || ''}
                        onMount={handleDiffEditorMount}
                      />
                    )}
                  </div>
                </div>
              </Split>
            </AutoFullHeightContainer>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default ViewOrCompareMetadataModal;